import { Request } from "express";
import prisma from "../../../shared/prisma";

const postReview = async (req: Request) => {
  const user = req.user;
  const payload = req.body;

  // Fetch order data
  const orderData = await prisma.customer.findUniqueOrThrow({
    where: { id: user?.id },
    include: {
      orders: {
        include: {
          orderItems: true,
        },
      },
    },
  });

  // Check if payload.productId exists in any orderItems
  const isProductInOrders = orderData.orders.some((order) =>
    order.orderItems.some(
      (orderItem) => orderItem.productId === payload.productId
    )
  );
  console.log(isProductInOrders);

  if (!isProductInOrders) {
    throw new Error("Product ID not found in customer's order items.");
  }

  const reviewTable = {
    productId: payload.productId,
    rating: payload.rating,
    review: payload.review,
    customerId: user?.id as string,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    // Create the review
    const createdReview = await transactionClient.reviews.create({
      data: reviewTable,
    });

    // Create the review-product relationship
    const productReview = await transactionClient.reviewProducts.create({
      data: {
        productId: payload.productId,
        reviewId: createdReview.id,
      },
    });

    return productReview;
  });

  return result;
};

export const ReviewServices = {
  postReview,
};
