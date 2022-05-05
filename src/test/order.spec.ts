import mongoose from "mongoose";
import request from "supertest";
import { expect } from "chai";
import { app, base } from "../app";
import { Product, Order } from "../interfaces";
import { read } from "fs";

const ProductModel = base<Product>("product");
const OrderModel = mongoose.model<Order>("Order");

describe("/api", () => {
  //So Id add authentication and try to signin before all the request and send the
  //token and be authenticated
  beforeEach(async () => {});
  after(async function () {
    this.timeout(600000);
    await OrderModel.deleteMany();
  });
  describe("post /order/checkout", () => {
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
    it("verify an order payment", async function () {
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
        expect(data.message).equal("Order Verified");
      }, 30000);
    });
  });
});
