import { ICart, ICartProduct, IProduct } from "../../interfaces";

export namespace AppReducer {
  export interface State {
    isLoading: boolean;
    products: IProduct[];
    cartProducts: ICartProduct[];
    page: number;
    quantity: number;
    price: number;
    error?: number;
  }

  export type Action =
    | {
        type: EActionType.CALL_GET_PRODUCTS;
      }
    | {
        type: EActionType.UPDATE_PRODUCTS;
        data: State["products"];
      }
    | {
        type: EActionType.UPDATE_PRODUCT;
        data: IProduct;
      }
    | {
        type: EActionType.UDPATE_PAGE;
        data: number;
      }
    | {
        type: EActionType.UPDATE_CART;
        data: ICart;
      };

  export enum EActionType {
    CALL_GET_PRODUCTS = "callGetProducts",
    UPDATE_PRODUCTS = "updateProducts",
    UPDATE_PRODUCT = "updateProduct",
    UDPATE_PAGE = "updatePage",
    UPDATE_CART = "updateCart",
  }
}
