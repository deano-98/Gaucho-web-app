export type FulfilmentMethod = "PICKUP" | "DELIVERY";
export type OrderStatus = "PENDING_WHATSAPP" | "CONFIRMED" | "CANCELLED" | "FULFILLED";
export type EmailStatus = "PENDING" | "SENT" | "FAILED";

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email: string;
}

export interface FulfilmentDetails {
  method: FulfilmentMethod;
  pickupLocation?: "WESTGATE" | "AVONDALE";
  deliveryAddress?: string;
}
