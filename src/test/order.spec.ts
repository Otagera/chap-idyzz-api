import mongoose from "mongoose";
import request from "supertest";
import { expect } from "chai";
import { app, base } from "../app";
import { Product, Order, Cart } from "../interfaces";
import { read } from "fs";

const ProductModel = base<Product>("product");
const OrderModel = mongoose.model<Order>("Order");
const CartModel = mongoose.model<Cart>("Cart");

describe("/api", () => {
  //So Id add authentication and try to signin before all the request and send the
  //token and be authenticated
  let cartId = "0";
  beforeEach(async () => {});
  /* describe("post /order/checkout", () => {
    it("should checkout an order", async function () {
      this.timeout(100000);
      const res = await request(app)
        .post("/api/order/checkout")
        .send({
          email: "otagera@gmail.com",
          products: [
            { PartNumber: "C000065S048A", quantity: 2 },
            { PartNumber: "N000082L124A", quantity: 2 },
            { PartNumber: "SG00PL3030AA", quantity: 2 },
            { PartNumber: "SG00PL3030AAd", quantity: 1 },
          ],
        });
      expect(res.status).to.equal(200);
      expect(res.body.data.length).not.equal(0);
      expect(res.body.data.message).equal("Order checked out");
    });
  });
  describe("get /order/verify", () => {
    it("should unsuccessfully find order", async function () {
      this.timeout(100000);
      const ress = await request(app)
        .post("/api/order/checkout")
        .send({
          email: "otagera@gmail.com",
          products: [
            { PartNumber: "C000065S048A", quantity: 2 },
            { PartNumber: "N000082L124A", quantity: 2 },
            { PartNumber: "SG00PL3030AA", quantity: 2 },
            { PartNumber: "SG00PL3030AAd", quantity: 1 },
          ],
        });
      const res = await request(app).get(
        `/api/order/verify/${ress.body.data.order.paymentRef}d`
      );
      const { data } = res.body;
      expect(res.status).to.equal(200);
      expect(data.length).not.equal(0);
      expect(data.message).equal("Order not found");
    });
    it("should unsuccessfully verify an order payment", async function () {
      this.timeout(100000);
      const ress = await request(app)
        .post("/api/order/checkout")
        .send({
          email: "otagera@gmail.com",
          products: [
            { PartNumber: "C000065S048A", quantity: 2 },
            { PartNumber: "N000082L124A", quantity: 2 },
            { PartNumber: "SG00PL3030AA", quantity: 2 },
            { PartNumber: "SG00PL3030AAd", quantity: 1 },
          ],
        });
      const res = await request(app).get(
        `/api/order/verify/${ress.body.data.order.paymentRef}`
      );
      const { data } = res.body;
      expect(res.status).to.equal(200);
      expect(data.length).not.equal(0);
      expect(data.message).equal("Order verification unsuccessful");
    });
    it("should successfully verify an order payment", async function () {
      this.timeout(100000);
      const ress = await request(app)
        .post("/api/order/checkout")
        .send({
          email: "otagera@gmail.com",
          products: [
            { PartNumber: "C000065S048A", quantity: 2 },
            { PartNumber: "N000082L124A", quantity: 2 },
            { PartNumber: "SG00PL3030AA", quantity: 2 },
            { PartNumber: "SG00PL3030AAd", quantity: 1 },
          ],
        });
      console.log(ress.body.data.authorization_url);
      setTimeout(async () => {
        const res = await request(app).get(
          `/api/order/verify/${ress.body.data.order.paymentRef}`
        );
        const { data } = res.body;
        expect(res.status).to.equal(200);
        expect(data.length).not.equal(0);
        expect(data.message).equal("Order verification successful");
        await OrderModel.deleteMany();
      }, 30000);
    });
  }); */
  describe("post /cart", () => {
    it("should not find user", async function () {
      await CartModel.deleteMany({});
      this.timeout(100000);
      const res = await request(app)
        .post("/api/cart")
        .send({
          userId: "629551832fbf1068266f5cb6",
          products: [
            { productId: "recGvUezjm2KUtCdc", quantity: 2 },
            { productId: "recESnRz5hSsHYFAO", quantity: 12 },
            { productId: "recIwhNICRFecriHn", quantity: 5 },
            { productId: "recKsJ9EvLq5VOIAR", quantity: 1 },
          ],
        });
      const { data } = res.body;
      expect(res.status).to.equal(404);
      expect(data.message).equal("User does not exist");
    });
    it("should add items to cart", async function () {
      await CartModel.deleteMany({});
      this.timeout(100000);
      const res = await request(app)
        .post("/api/cart")
        .send({
          userId: "629551832fbf1068266f5cb7",
          products: [
            { productId: "recGvUezjm2KUtCdc", quantity: 2 },
            { productId: "recESnRz5hSsHYFAO", quantity: 12 },
            { productId: "recIwhNICRFecriHn", quantity: 5 },
            { productId: "recKsJ9EvLq5VOIAR", quantity: 1 },
          ],
        });
      const { data } = res.body;
      expect(res.status).to.equal(201);
      expect(data.length).not.equal(0);
      expect(data.message).equal("Products successfully added to cart");
    });
    it("should edit amount if product already in cart", async function () {
      this.timeout(100000);
      const addRes = await request(app)
        .post("/api/cart")
        .send({
          userId: "629551832fbf1068266f5cb7",
          products: [
            { productId: "recGvUezjm2KUtCdc", quantity: 2 },
            { productId: "recESnRz5hSsHYFAO", quantity: 12 },
            { productId: "recIwhNICRFecriHn", quantity: 5 },
            { productId: "recKsJ9EvLq5VOIAR", quantity: 1 },
          ],
        });
      const res = await request(app)
        .post("/api/cart")
        .send({
          userId: "629551832fbf1068266f5cb7",
          products: [
            { productId: "recGvUezjm2KUtCdc", quantity: 4 },
            { productId: "recESnRz5hSsHYFAO", quantity: 12 },
            { productId: "recKsJ9EvLq5VOIAR", quantity: 13 },
            {
              productId: "recLuFdNG1DVRxZPo",
              quantity: 33,
            },
          ],
        });
      const { data } = res.body;
      expect(res.status).to.equal(200);
      expect(data.length).not.equal(0);
      expect(data.message).equal("Products successfully edited to cart");
    });
  });
  describe("GET /carts", () => {
    /*  beforeEach(async function () {
      this.timeout(50000);
      await CartModel.deleteMany({});
      const t = await request(app)
        .post("/api/cart")
        .send({
          userId: "629551832fbf1068266f5cb7",
          products: [
            { productId: "recGvUezjm2KUtCdc", quantity: 2 },
            { productId: "recESnRz5hSsHYFAO", quantity: 12 },
            { productId: "recIwhNICRFecriHn", quantity: 5 },
            { productId: "recKsJ9EvLq5VOIAR", quantity: 1 },
          ],
        });
      // console.log(t);
    }); */
    it("should return all cart items", async function () {
      this.timeout(100000);
      const res = await request(app).get("/api/carts");
      const { data } = res.body;
      console.log(data.carts);
      cartId = data.carts[0]._id;
      expect(res.status).to.equal(200);
      expect(data.carts.length).equal(1);
      expect(data.message).equal("Retrieved carts successfully");
    });
  });
  describe("GET /cart", () => {
    it("should return cart by id", async function () {
      const res = await request(app).get(`/api/cart/${cartId}`);
      const { data } = res.body;
      expect(res.status).to.equal(200);
      /* expect(data.cart).to.have.property("PartNumber", "C060082R118A");
      expect(data.cart).to.have.property(
        "Description",
        "PTP 820 RFU-C,6HGHz,TR340B,Ch5W8,Lo,6581-6739MHz"
      ); */
    });

    it("should say not found", async function () {
      const generateId = () => {
        var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
        return (
          timestamp +
          "xxxxxxxxxxxxxxxx"
            .replace(/[x]/g, function () {
              return ((Math.random() * 16) | 0).toString(16);
            })
            .toLowerCase()
        );
      };
      const res = await request(app).get(`/api/cart/${generateId()}`);
      const { data } = res.body;
      expect(res.status).to.equal(404);
      expect(data.message).to.equal("Cart not found");
    });

    it("should say not found", async function () {
      const res = await request(app).get(`/api/cart/${"fjhrywhd"}`);
      const { data } = res.body;
      expect(res.status).to.equal(404);
      expect(data.message).to.equal("Invalid userId");
    });
  });
});
