import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../../domain/product/factory/product.factory";
import ProductModel from "../../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("Unit test for listing product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
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

  it("should list a product", async () => {
    const repository = new ProductRepository();
    const useCase = new ListProductUseCase(repository);

    await repository.create(
        ProductFactory.create(
        '123',
        'a',
        'knife',
        10
      )
    );
    
    await repository.create(
      ProductFactory.create(
        '321',
        'b',
        'fork',
        10
      )
    );

    const product1 = {
      name: 'knife',
      price: 10
    }

    const product2 = {
      name: 'fork',
      price: 20
    }

    const output = await useCase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[0].price).toBe(product1.price);
    expect(output.products[1].name).toBe(product2.name);
    expect(output.products[1].price).toBe(product2.price);
  });
});
