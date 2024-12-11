import { OrderStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { Request } from "express";

const createOrderToDb = async (
  customerId: string,
  cartItems: any[]
): Promise<any> => {
  // Ensure customer exists and is not deleted
  await prisma.customer.findUniqueOrThrow({
    where: { id: customerId, isDeleted: false },
  });

  // Create the order in a transaction
  const result = await prisma.$transaction(async (transactionClient) => {
    // Create the main order entry
    const newOrder = await transactionClient.orders.create({
      data: {
        customerId,
        orderDate: new Date(),
      },
    });

    // Create order items for the newly created order
    const orderItems = cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      orderId: newOrder.id, // Link order items to the created order
    }));

    // Insert the order items
    await transactionClient.orderItem.createMany({
      data: orderItems,
    });

    // Update the inventory counts for the products
    for (let item of cartItems) {
      // Ensure inventory count is sufficient before decrementing
      const product = await transactionClient.products.findUnique({
        where: { id: item.productId },
      });

      if (product && product.inventoryCount >= item.quantity) {
        await transactionClient.products.update({
          where: { id: item.productId },
          data: {
            inventoryCount: { decrement: item.quantity }, // Decrease inventory count
          },
        });
      } else {
        throw new Error(`Not enough inventory for product ${item.productId}`);
      }
    }

    return newOrder;
  });

  return result;
};

const getOrdersByAdmin = async (customerId: string): Promise<any[]> => {
  return await prisma.orders.findMany({
    where: { customerId },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });
};

const updateOrderStatus = async (id: string, payload: any) => {
  const orderInfo = await prisma.orders.update({
    where: { id },
    data: {
      ...payload,
    },
  });
  return orderInfo;
};

const getOrdersByCustomer = async (id: string, req: Request) => {
  const user = req.user;
  if (!user) {
    throw new Error("User is not authenticated");
  }
  // Fetch the customer's information based on their email
  const userInfo = await prisma.customer.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });
  // Ensure the `id` belongs to the authenticated user
  if (userInfo.id !== id) {
    throw new Error("Unauthorized access to customer orders");
  }
  // Fetch the orders for the given customer ID
  const orders = await prisma.orders.findMany({
    where: {
      customerId: id,
    },
  });
  // console.log(orders);
  return orders;
};

const getAllOrders = async () => {
  const result = await prisma.orders.findMany({
    include: {
      orderItems: true,
    },
  });
  return result;
};
export const orderServices = {
  createOrderToDb,
  getOrdersByAdmin,
  updateOrderStatus,
  getOrdersByCustomer,
  getAllOrders,
};
