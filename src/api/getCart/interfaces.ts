import { ICartProduct } from "../../interfaces";

export namespace GetCart {
  export interface Response {
    items: ICartProduct[];
    totalPrice: number;
    totalItems: number;
  }
}
