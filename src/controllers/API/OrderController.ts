import { Request, Response } from "express";
import mongoose from "mongoose";
import axios, { Method } from "axios";
import { get, post, bodyValidator, controller } from "../decorators/index";
import {
  Product,
  Order,
  OrderProduct,
  OrderProductQuery,
} from "../../interfaces";
import { base } from "../../app";

const PAYSTACK = "https://api.paystack.co/transaction";
const Header = {
  Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
  "Content-Type": "application/json",
};
const ProductModel = base<Product>("product");
const OrderModel = mongoose.model<Order>("Order");

@controller("/api/order")
class OrderController {
  @post("/checkout")
  @bodyValidator("email", "products", "callback_url")
  async checkout(req: Request, res: Response) {
    const { email, products, callback_url } = req.body;
    try {
      const productsFound: Product[] = [];
      let totalAmount = 0;
      const newProducts: OrderProduct[] = [];
      for (const product of products as OrderProductQuery[]) {
        const productRecord = await ProductModel.select({
          filterByFormula: `PartNumber = "${product.PartNumber}"`,
        }).all();
        if (productRecord.length > 0) {
          productsFound.push(productRecord[0].fields);
          totalAmount += productRecord[0].fields.MSRP * product.quantity;
          newProducts.push({
            ...product,
            productId: productRecord[0].getId(),
          });
        }
      }
      const paymentdata = JSON.stringify({
        email: email,
        amount: `${totalAmount}00`,
        callback_url: callback_url || "https://www.google.com",
      });
      const POST: Method = "POST";
      const config = {
        method: POST,
        url: `${PAYSTACK}/initialize`,
        headers: Header,
        data: paymentdata,
      };
      const response = await axios(config);
      const order = new OrderModel({
        products: newProducts,
        amount: totalAmount,
        paymentRef: response.data.data.reference,
      });
      const newOrder = await order.save({});
      return res.statusJson(200, {
        data: {
          message: "Order checked out",
          order: newOrder,
          authorization_url: response.data.data.authorization_url,
        },
      });
    } catch (error) {
      console.log(error);
      return res.statusJson(500, { error });
    }
  }
  @get("/verify/:reference")
  async verify(req: Request, res: Response) {
    const { reference } = req.params;
    try {
      const order = await OrderModel.findOne({ paymentRef: reference });
      if (order) {
        const dataVerify = JSON.stringify({ reference: reference });
        const GET: Method = "GET";
        const configVerify = {
          method: GET,
          url: `${PAYSTACK}/verify/${reference}`,
          headers: Header,
          data: dataVerify,
        };

        const responseVerify = await axios(configVerify);
        const { data, status } = responseVerify.data;
        if (status && data.status === "success") {
          order.status = true;
          await order.save();
          const productsArrays: OrderProduct[][] = [];
          for (let ii = 0; ii < order.products.length; ii = +9) {
            let t = [];
            productsArrays.push(order.products.slice(ii, ii + 10));
          }
          for (let ii = 0; ii < productsArrays.length; ii++) {
            const products = [];
            for (const product of productsArrays[ii]) {
              const prod = await ProductModel.find(`${product.productId}`);
              products.push({
                id: prod.getId(),
                fields: {
                  Quantity: prod.get("Quantity") - product.quantity,
                },
              });
            }
            await ProductModel.update(products);
          }
          return res.statusJson(200, {
            data: {
              message: "Order verification successful",
              order,
            },
          });
        } else {
          return res.statusJson(200, {
            data: {
              message: "Order verification unsuccessful",
            },
          });
        }
      }
      return res.statusJson(200, {
        data: {
          message: "Order not found",
        },
      });
    } catch (error) {
      console.log(error);
      return res.statusJson(500, { error });
    }
  }
}
