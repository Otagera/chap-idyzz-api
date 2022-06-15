import { Request, Response } from "express";
import mongoose from "mongoose";
import { get, post, bodyValidator, controller, del } from "../decorators/index";
import { Product, Order, User, Cart, CartItem } from "../../interfaces";
import { base } from "../../app";

const UserModel = mongoose.model<User>("User");
const CartModel = mongoose.model<Cart>("Cart");
const ProductModel = base<Product>("product");

@controller("/api")
class CartController {
  //write test asap for this and other cart operations
  //add
  //   new cart item
  // edit
  //  cart items is taken care of in add
  //  cart item
  // delete
  //  multiple items
  //  entire items
  //  one item
  @post("/cart")
  @bodyValidator("userId", "products")
  async addToCart(req: Request, res: Response) {
    const { userId, products } = req.body;
    try {
      const productMap = new Map<string, number>();
      for (let product of products as CartItem[]) {
        const productRecord = await ProductModel.find(product.productId);
        productRecord && productMap.set(product.productId, product.quantity);
      }
      const user = await UserModel.findById(userId);
      if (user) {
        let cart = await CartModel.findOne({
          userId,
        });
        if (cart) {
          for (let item of cart.cartItems) {
            const { productId } = item;
            const productQ = productMap.get(productId);
            if (productQ) {
              item.quantity = productQ;
              productMap.delete(productId);
            }
          }
          for (const [productId, quantity] of productMap) {
            cart.cartItems.push({
              quantity,
              productId,
            });
          }
          await cart.save({});
          return res.statusJson(200, {
            data: {
              message: "Products successfully edited to cart",
              cart,
            },
          });
        } else {
          const newCart = new CartModel({
            userId,
            cartItems: products as CartItem[],
          });
          await newCart.save({});
          return res.statusJson(201, {
            data: {
              message: "Products successfully added to cart",
              cart: newCart,
            },
          });
        }
      } else {
        return res.statusJson(404, {
          data: {
            message: "User does not exist",
          },
        });
      }
    } catch (error) {
      console.log(error);
      return res.statusJson(500, { error });
    }
  }

  @get("/carts")
  async getCarts(req: Request, res: Response) {
    try {
      const carts = await CartModel.find({});

      return res.statusJson(200, {
        data: {
          message: "Retrieved carts successfully",
          carts,
        },
      });
    } catch (error) {
      console.log(error);
      return res.statusJson(500, { error });
    }
  }

  @get("/cart/:id")
  async getCart(req: Request, res: Response) {
    const { id } = req.params;
    try {
      if (mongoose.Types.ObjectId.isValid(id)) {
        const cart = await CartModel.findById(id);
        if (cart) {
          return res.statusJson(200, {
            data: {
              message: "Cart retrieved successfully",
              cart,
            },
          });
        } else {
          return res.statusJson(404, {
            data: {
              message: "Cart not found",
            },
          });
        }
      } else {
        return res.statusJson(404, {
          data: {
            message: "Invalid cart Id",
          },
        });
      }
    } catch (error) {
      console.log(error);
      return res.statusJson(500, { error });
    }
  }

  @del("/cart/:id")
  async deleteCart(req: Request, res: Response) {
    const { id } = req.params;
    try {
      if (mongoose.Types.ObjectId.isValid(id)) {
        const cart = await CartModel.deleteOne({ id });
        if (cart.deletedCount) {
          return res.statusJson(200, {
            data: {
              message: "Cart deleted successfully",
              cart,
            },
          });
        } else {
          return res.statusJson(404, {
            data: {
              message: "Cart by that id not found",
              cart,
            },
          });
        }
      } else {
        return res.statusJson(404, {
          data: {
            message: "Invalid cart Id",
          },
        });
      }
    } catch (error) {
      console.log(error);
      return res.statusJson(500, { error });
    }
  }

  @del("/cart/:id/:productId")
  async deleteCartItem(req: Request, res: Response) {
    const { id, productId } = req.params;
    try {
      if (mongoose.Types.ObjectId.isValid(id)) {
        const cart = await CartModel.findById(id);
        if (cart) {
          cart.cartItems = cart.cartItems.filter(
            (item) => item.productId !== productId
          );
          await cart.save({});
          return res.statusJson(200, {
            data: {
              message: "Cart item deleted successfully",
              cart,
            },
          });
        } else {
          return res.statusJson(404, {
            data: {
              message: "Cart by that id not found",
            },
          });
        }
      } else {
        return res.statusJson(404, {
          data: {
            message: "Invalid cart Id",
          },
        });
      }
    } catch (error) {
      console.log(error);
      return res.statusJson(500, { error });
    }
  }
}
