import { InputCreateProductDto } from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";
let inputA: InputCreateProductDto;
let inputB: InputCreateProductDto;

describe("Unit test create product use case", () => {

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
    })
    
    const MockRepository = () => {
      return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      };
    };

    const productRepository = MockRepository()
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
