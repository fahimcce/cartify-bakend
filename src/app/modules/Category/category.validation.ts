import { z } from "zod";

const createCategory = z.object({
  name: z.string({ required_error: "category name is required" }),
});

export const categoryValidation = {
  createCategory,
};
