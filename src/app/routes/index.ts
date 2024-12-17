import express from "express";
import { userRoutes } from "../modules/User/user.routes";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { CategoryRoutes } from "../modules/Category/category.routes";
import { ShopRoutes } from "../modules/Shop/shop.routes";
import { ProductRoutes } from "../modules/Product/product.routes";
import { AdminRoutes } from "../modules/Admin/admin.routes";
import { OrderRoutes } from "../modules/Order/order.routes";
import { VendorRoutes } from "../modules/Vendor/vendor.routes";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/category",
    route: CategoryRoutes,
  },
  {
    path: "/shops",
    route: ShopRoutes,
  },
  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/orders",
    route: OrderRoutes,
  },
  {
    path: "/vendor",
    route: VendorRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
