import { ICartProduct } from "../../interfaces";

export namespace PostAddToCart {
  export interface Body {
    productId: number;
    quantity: number;
  }

  export interface Response {
    items: ICartProduct[];
    totalPrice: number;
    totalItems: number;
  }
}
