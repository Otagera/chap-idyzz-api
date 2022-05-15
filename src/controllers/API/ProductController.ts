import { Request, Response } from "express";
import { get, controller } from "../decorators/index";
import { Product } from "../../interfaces";
import { base, view } from "../../app";
import { Records } from "airtable";

const ProductModel = base<Product>("product");

@controller("/api")
class ProductController {
  @get("/products")
  async getProducts(req: Request, res: Response) {
    const { quantity } = req.query;
    try {
      const productSelect = ProductModel.select({ view });
      let records: Records<Product>;
      if (quantity) {
        records = await productSelect.firstPage();
      } else {
        records = await productSelect.all();
      }
      // console.log(records);
      const products: Product[] = [];
      records.map((record) => {
        //console.log(record);
        products.push({ ...record.fields, id: record.getId() });
      });
      if (products.length < 1) {
        return res.statusJson(404, { data: { message: "No Product" } });
      }

      return res.statusJson(200, { data: products });
    } catch (error) {
      console.log(error);
      return res.statusJson(500, { error });
    }
  }

  @get("/product/:id")
  async getProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const productRecord = await ProductModel.find(id);
      if (!productRecord) {
        return res.statusJson(404, { data: { message: "No Product" } });
      }
      const product: Product = {
        ...productRecord.fields,
        id: productRecord.getId(),
      };

      return res.statusJson(200, { data: product });
    } catch (error) {
      return res.statusJson(error.statusCode || 500, { error });
    }
  }

  /* If theres a need for delete and add then i can get the code from the dynamics */
}
