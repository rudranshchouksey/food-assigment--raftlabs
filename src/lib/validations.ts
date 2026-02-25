import { z } from 'zod';

export const OrderSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  address: z.string().min(5, "Address is too short"),
  phone: z.string().regex(/^[0-9]{10}$/, "Invalid phone number"),
  items: z.array(z.object({
    name: z.string(),
    quantity: z.number().min(1),
    price: z.number()
  })).min(1, "Cart cannot be empty")
});