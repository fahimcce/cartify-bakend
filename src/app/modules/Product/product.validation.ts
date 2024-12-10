import { z } from "zod";

const createProduct = z.object({
  name: z.string({ required_error: "Product name is required" }),
  description: z.string({ required_error: "Description is required" }),
  inventoryCount: z.number().optional(), // Optional if not always provided
  images: z.string().optional(),
  discount: z.number().optional(),
});

export const productValidation = { createProduct };
