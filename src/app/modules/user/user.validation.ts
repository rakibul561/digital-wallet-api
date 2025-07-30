import z from "zod";


const userCreateZodSchema = z.object({
  name: z
    .string()
    .min(3, "Name Must be in 3 characters")
    .max(255, "Name can't be more that 255 characters"),
  email: z.email({ error: "Invalid email" }),

   password: z
        .string()
        .min(6, { message: "Password must be at least 8 characters long." })
        .regex(/^(?=.*[A-Z])/, {
            message: "Password must contain at least 1 uppercase letter.",
        })
        .regex(/^(?=.*[!@#$%^&*])/, {
            message: "Password must contain at least 1 special character.",
        })
        .regex(/^(?=.*\d)/, {
            message: "Password must contain at least 1 number.",
        }), 
  phone: z
        .string()
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
            message: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
        })
        .optional(),
 address: z
        .string()
        .max(200, { message: "Address cannot exceed 200 characters." })
        .optional()
});
 

const userLoginZodSchema = z.object({
  email: z.email({ error: "Invalid email" }),

  password: z.string(),
});

export const userZodSchema = {
  userCreateZodSchema,
  userLoginZodSchema,
};
