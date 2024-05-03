import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import ProductValidatorFactory from "../factory/product.validator.factory";
import ProductInterface from "./product.interface";

export default class Product extends Entity implements ProductInterface {
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super()
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get id(): string {
    return this._id;
  }
  
  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  changePrice(price: number): void {
    this._price = price;
    this.validate();
  }

  validate() {
    if (this._id == null || this._id == "") {
      this.notification.addError({
        context: 'product',
        message: 'Id is required'
      })
    }
    if (this.price <= 0) {
      this.notification.addError({
        context: 'product',
        message: 'price must be greater than 0'
      })
    }
    if (this.name == "" || this.name == undefined) {
      this.notification.addError({
        context: 'product',
        message: 'Name is required'
      })
    }
  }
}
