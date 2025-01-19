import express from "express";

import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { ReviewController } from "./review.controller";

const router = express.Router();

router.post("/", auth(UserRole.CUSTOMER), ReviewController.postReview);
router.get("/:id", ReviewController.productReview);

export const ReviewRoutes = router;
