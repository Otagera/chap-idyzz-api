import { app, request, expect, ProductModel, url } from "./common.spec";

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
  describe("GET /products/search?", () => {
    it("should return all products that match both the search parameters", async function () {
      this.timeout(100000);
      const path = url.format({
        pathname: `/api/products/search`,
        query: {
          description: "PTP SER EMC CABLE GLAND (GROUNDING) Qty. 10",
          pathnumber: "WB1811B",
          func: "and",
        },
      });
      const res = await request(app).get(path);
      expect(res.status).to.equal(200);
      expect(res.body.data.length).not.equal(0);
    });
    it("should return all products that match either of the search parameters", async function () {
      this.timeout(100000);
      const path = url.format({
        pathname: `/api/products/search`,
        query: {
          description: "Mounting Bracket (integrated)",
          pathnumber: "WB1811B",
          func: "or",
        },
      });
      const res = await request(app).get(path);
      expect(res.status).to.equal(200);
      expect(res.body.data.length).not.equal(0);
    });
    it("should return all products that match the search parameter Path number", async function () {
      this.timeout(100000);
      const path = url.format({
        pathname: `/api/products/search`,
        query: {
          pathnumber: "N000065L033A",
        },
      });
      const res = await request(app).get(path);
      expect(res.status).to.equal(200);
      expect(res.body.data.length).not.equal(0);
    });
    it("should return all products that match the search parameter description", async function () {
      this.timeout(100000);
      const path = url.format({
        pathname: `/api/products/search`,
        query: {
          description:
            "RFU-A Branching Drawer 1+1 SD Tx-L Sampler+Coupler, 6L-252A-3W6",
        },
      });
      const res = await request(app).get(path);
      expect(res.status).to.equal(200);
      expect(res.body.data.length).not.equal(0);
    });
    it("should return 404", async function () {
      this.timeout(100000);
      const path = url.format({
        pathname: `/api/products/search`,
        query: {
          name: "",
        },
      });
      const res = await request(app).get(path);
      expect(res.status).to.equal(404);
      expect(res.body.data.message).equal("No Product");
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
// ◢ ◤
