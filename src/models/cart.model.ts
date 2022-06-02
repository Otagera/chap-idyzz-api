import mongoose, { Schema } from "mongoose";
import { Cart } from "../interfaces";

const cartSchema = new Schema<Cart>({
  userId: { type: String, required: true },
  cartItems: {
    type: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    required: true,
  },
});

mongoose.model<Cart>("Cart", cartSchema);
