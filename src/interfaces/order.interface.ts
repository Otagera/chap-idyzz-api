import { Document } from "mongoose";

export interface OrderProduct {
  id?: string;
  product?: string;
  quantity: number;
}
export interface Order extends Document {
  products: OrderProduct[];
  amount: number;
  paymentRef: string;
  status?: boolean;
}
