import { z } from "zod";

const createShop = z.object({
  shopName: z.string({ required_error: "shop name is required" }),
  shopLogo: z.string().optional(),
  description: z.string().optional(),
  address: z.string().optional(),
  //   vendorId: z.string(),
});

export const shopValidation = {
  createShop,
};
