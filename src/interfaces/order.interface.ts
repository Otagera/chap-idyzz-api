import { Document } from "mongoose";
export interface Order extends Document {
  products: { id: string; product: string; quantity: number }[];
  amount: number;
  paymentRef: string;
  status?: boolean;
}
