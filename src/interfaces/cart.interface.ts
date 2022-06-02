import { Document } from "mongoose";

export interface Cart extends Document {
  userId: string;
  cartItems: CartItem[];
}
export interface CartItem {
  productId: string;
  quantity: number;
}
