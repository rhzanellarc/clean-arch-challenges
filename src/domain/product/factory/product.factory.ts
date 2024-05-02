import Product from "../entity/product";
import ProductInterface from "../entity/product.interface";
import { v4 as uuid } from "uuid";
import ProductB from "../entity/product-b";

export default class ProductFactory {
  public static create(
    id: string,
    type: string,
    name: string,
    price: number
  ): ProductInterface {
    switch (type) {
      case "a":
        return new Product(id, name, price);
      case "b":
        return new ProductB(id, name, price);
      default:
        throw new Error("Product type not supported");
    }
  }
}
