import { z } from "zod";

const creatAdmin = z.object({
  password: z.string({
    required_error: "password is required",
  }),
  admin: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z.string({
      required_error: "Email is required",
    }),
    contactNumber: z.string({
      required_error: "Contact Number is required",
    }),
    profilePhoto: z.string().optional(),
  }),
});
const creatVendor = z.object({
  password: z.string({
    required_error: "password is required",
  }),
  vendor: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z.string({
      required_error: "Email is required",
    }),
    contactNumber: z.string({
      required_error: "Contact Number is required",
    }),
    profilePhoto: z.string().optional(),
  }),
});
const creatCustomer = z.object({
  password: z.string({
    required_error: "password is required",
  }),
  customer: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z.string({
      required_error: "Email is required",
    }),
    contactNumber: z.string({
      required_error: "Contact Number is required",
    }),
    profilePhoto: z.string().optional(),
  }),
});

export const userValidation = {
  creatAdmin,
  creatVendor,
  creatCustomer,
};
