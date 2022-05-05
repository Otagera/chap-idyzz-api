/* import mongoose from "mongoose";
import request from "supertest";
import { expect } from "chai";
import { app, base } from "../app";
import { Product } from "../interfaces";
import { read } from "fs";

const ProductModel = base<Product>("product");

describe("/api", () => {
  //So Id add authentication and try to signin before all the request and send the
  //token and be authenticated
  beforeEach(async () => {});
  describe("GET /products", () => {
    it("should return all products", async function () {
      this.timeout(100000);
      //Its sending the data but its coming late because I think the data are so much that
      //it is taking a very long time.
      const res = await request(app).get("/api/products");
      expect(res.status).to.equal(200);
      expect(res.body.data.length).not.equal(0);
    });
  });
  describe("GET /product", () => {
    it("should return products by id", async function () {
      const id = "recGG8Eb9SOrHv7sH";
      const res = await request(app).get(`/api/product/${id}`);
      const { data } = res.body;
      expect(res.status).to.equal(200);
      expect(data).to.have.property("PartNumber", "C060082R118A");
      expect(data).to.have.property(
        "Description",
        "PTP 820 RFU-C,6HGHz,TR340B,Ch5W8,Lo,6581-6739MHz"
      );
    });
    it("should say not found", async function () {
      const id = "recGG8Eb9SOrHv7sHsss";
      const res = await request(app).get(`/api/product/${id}`);
      expect(res.status).to.equal(404);
    });
  });
});
 */
