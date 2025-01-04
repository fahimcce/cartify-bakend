import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { orderControllers } from "./order.controller";
const router = express.Router();

router.get(
  "/my-orders/:id",
  auth(UserRole.CUSTOMER),
  orderControllers.getOrdersByCustomer
);

// Route to create an order
router.post(
  "/",
  auth(UserRole.CUSTOMER, UserRole.ADMIN),
  orderControllers.createOrderByCustomer
);

//get all orders  by Admin
router.get("/", auth(UserRole.ADMIN), orderControllers.getAllOrders);

//get orders any customer by Admin
router.get(
  "/:customerId",
  auth(UserRole.ADMIN),
  orderControllers.getOrdersByAdmin
);

router.patch("/:id", auth(UserRole.ADMIN), orderControllers.updateOrderStatus);

export const OrderRoutes = router;
