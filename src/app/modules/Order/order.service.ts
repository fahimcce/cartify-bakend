import { OrderStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";

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

// Fetch orders by customer and include order items and product details
const getOrdersByCustomer = async (customerId: string): Promise<any[]> => {
  return await prisma.orders.findMany({
    where: { customerId },
    include: {
      orderItems: {
        include: {
          product: true, // Include product details for each order item
        },
      },
    },
  });
};

export const orderServices = {
  createOrderToDb,
  getOrdersByCustomer,
};
