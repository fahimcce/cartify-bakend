import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { orderControllers } from "./order.controller";
const router = express.Router();

// Route to create an order
router.post(
  "/",
  auth(UserRole.CUSTOMER, UserRole.ADMIN),
  orderControllers.createOrderByCustomer
);

// Route to get orders by customer
router.get("/:customerId", auth(), orderControllers.getOrdersByCustomer);

export const OrderRoutes = router;
