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

// Controller to get orders by Admin
const getOrdersByAdmin = catchAsync(async (req: Request, res: Response) => {
  const { customerId } = req.params; // Get customer ID from the params
  const orders = await orderServices.getOrdersByAdmin(customerId);
  // Send success response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Orders fetched successfully",
    data: orders,
  });
});

// Controller to get orders by Admin
const getOrdersByCustomer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params; // Get customer ID from the params
  const orders = await orderServices.getOrdersByCustomer(id, req);
  // Send success response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Your all order fetch successfully",
    data: orders,
  });
});

// get All orders by Admin
const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const orders = await orderServices.getAllOrders();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All orders fetch successfully",
    data: orders,
  });
});

// Controller to get orders by customer
const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params; // Get customer ID from the params
  const orders = await orderServices.updateOrderStatus(id, req.body);
  // Send success response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Order Status Updated successfully",
    data: orders,
  });
});

export const orderControllers = {
  createOrderByCustomer,
  getOrdersByAdmin,
  updateOrderStatus,
  getOrdersByCustomer,
  getAllOrders,
};
