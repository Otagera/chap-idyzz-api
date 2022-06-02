import { Document } from "mongoose";

export interface OrderProductQuery {
  PartNumber: string;
  quantity: number;
}
export interface OrderProduct {
  productId: string;
  quantity: number;
}
export interface Order extends Document {
  products: OrderProduct[];
  amount: number;
  paymentRef: string;
  status?: boolean;
}
