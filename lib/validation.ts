import { z } from "zod";

export const BasketItemInputSchema = z.object({
  lineId: z.string().min(1).max(300),
  productId: z.string().min(1).max(100),
  quantity: z.number().int().min(1).max(50),
  flavourId: z.string().max(100).optional(),
  sizeId: z.string().max(100).optional(),
  variantId: z.string().max(100).optional(),
  comboOptions: z.record(z.string(), z.array(z.string().max(100)).max(10)).optional()
});

export const OrderRequestSchema = z.object({
  idempotencyKey: z.string().uuid(),
  customer: z.object({
    fullName: z.string().trim().min(2).max(100),
    phone: z.string().trim().min(7).max(30).regex(/^[+\d\s().-]+$/),
    email: z.string().trim().email().max(254)
  }),
  fulfilment: z.discriminatedUnion("method", [
    z.object({ method: z.literal("PICKUP"), pickupLocation: z.enum(["WESTGATE", "AVONDALE"]) }),
    z.object({ method: z.literal("DELIVERY"), deliveryAddress: z.string().trim().min(5).max(500) })
  ]),
  items: z.array(BasketItemInputSchema).min(1).max(50)
});

export type OrderRequest = z.infer<typeof OrderRequestSchema>;
