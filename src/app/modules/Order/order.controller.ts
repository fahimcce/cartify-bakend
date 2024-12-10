import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { orderServices } from "./order.service";

// Controller to create an order
const createOrderByCustomer = catchAsync(
  async (req: Request, res: Response) => {
    const { customerId, cartItems } = req.body; // Cart items and customer ID should be in the
    const order = await orderServices.createOrderToDb(customerId, cartItems);
    // Send success response
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Order placed successfully!",
      data: order,
    });
  }
);

// Controller to get orders by customer
const getOrdersByCustomer = catchAsync(async (req: Request, res: Response) => {
  const { customerId } = req.params; // Get customer ID from the params
  const orders = await orderServices.getOrdersByCustomer(customerId);
  // Send success response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Orders fetched successfully",
    data: orders,
  });
});

export const orderControllers = {
  createOrderByCustomer,
  getOrdersByCustomer,
};
