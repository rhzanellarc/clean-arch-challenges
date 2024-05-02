import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../../infrastructure/product/repository/sequelize/product.model";
import CreateProductUseCase from "./create.product.usecase";
import ProductRepository from "../../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../../domain/product/entity/product";
import ProductB from "../../../../domain/product/entity/product-b";
import { InputCreateProductDto } from "./create.product.dto";


describe("Unit test create product use case", () => {
  let inputA: InputCreateProductDto
  let inputB: InputCreateProductDto;
  let sequelize: Sequelize;

  beforeEach(async () => {
    inputA = {
      type: 'a',
      name: "Knife",
      price: 10
    };
    inputB  = {
      type: 'b',
      name: "Spoon",
      price: 8
    };

    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  const productRepository = new ProductRepository()
  const productCreateUseCase = new CreateProductUseCase(productRepository);


  it("Should create product A", async () => {
    const output = await productCreateUseCase.execute(inputA);

    expect(output).toEqual({
      id: expect.any(String),
      name: inputA.name,
      price: inputA.price
    });
  });

  it("Should create product B", async () => {
    const output = await productCreateUseCase.execute(inputB);
    expect(output).toEqual({
      id: expect.any(String),
      name: inputB.name,
      price: inputB.price * 2
    });
  });
  

  it("should thrown an error when name is missing", async () => {
    inputA.name = ""

    await expect(productCreateUseCase.execute(inputA)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should thrown an error when price is < 0", async () => {
    inputA.price = -1

    await expect(productCreateUseCase.execute(inputA)).rejects.toThrow(
      "product: price must be greater than 0"
    );
  });
})
