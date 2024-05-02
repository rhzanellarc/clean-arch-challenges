import ProductRepositoryInterface from "../../../../domain/product/repository/product-repository.interface";
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "./create.product.dto";
import ProductFactory from "../../../../domain/product/factory/product.factory";
import { v4 as uuid } from "uuid";

export default class CreateProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(
    input: InputCreateProductDto
  ): Promise<OutputCreateProductDto> {
    const product = ProductFactory.create(
      uuid(),
      input.type,
      input.name,
      input.price      
    );

    await this.productRepository.create(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price
    };
  }
}
