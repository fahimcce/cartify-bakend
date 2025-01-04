import { UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { Request } from "express";

const createOrderToDb = async (req: Request) => {
  const { cartItems, PaymentStatus } = req.body;
  const user = req.user;
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
      status: UserStatus.ACTIVE,
    },
    include: {
      admin: true,
      vendor: true,
      customer: true,
    },
  });
  let validUser: any = null;

  // Check which property is not null and assign it to validUser
  if (userData.admin) {
    validUser = userData.admin;
  } else if (userData.vendor) {
    validUser = userData.vendor;
  } else if (userData.customer) {
    validUser = userData.customer;
  }

  await prisma.customer.findUniqueOrThrow({
    where: { id: validUser.id, isDeleted: false },
  });
  // Create the order in a transaction
  const result = await prisma.$transaction(async (transactionClient) => {
    // Create the main order entry
    const newOrder = await transactionClient.orders.create({
      data: {
        customerId: validUser.id,
        orderDate: new Date(),
        PaymentStatus,
      },
    });

    // Create order items for the newly created order
    const orderItems = cartItems.map((item: any) => ({
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
  const userInfo = await prisma.customer.findUniqueOrThrow({
    where: {
      id: id,
    },
    include: {
      orders: {
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });
  const result = userInfo.orders;
  return result;
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
