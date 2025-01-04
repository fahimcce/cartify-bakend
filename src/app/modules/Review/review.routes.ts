import express from "express";

import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { ReviewController } from "./review.controller";

const router = express.Router();

router.post("/", auth(UserRole.CUSTOMER), ReviewController.postReview);

export const ReviewRoutes = router;
