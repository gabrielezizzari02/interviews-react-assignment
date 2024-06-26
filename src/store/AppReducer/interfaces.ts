import { ICart, ICartProduct, IProduct } from "../../interfaces";

export namespace AppReducer {
  export interface State {
    isLoading: boolean;
    products: IProduct[];
    cartProducts: ICartProduct[];
    page: number;
    quantity: number;
    price: number;
    category?: string;
    hasProductsFinished: boolean;
    error?: number;
    searchInput?: string;
    isPriceLoading: boolean;
    lastItemClicked?: number;
  }

  export type Action =
    | {
        type: EActionType.CALL_GET_PRODUCTS;
      }
    | {
        type: EActionType.UPDATE_PRODUCTS;
        data: { products: State["products"]; hasMore: boolean };
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
      }
    | {
        type: EActionType.UPDATE_CATEGORY;
        data: string;
      }
    | {
        type: EActionType.UPDATE_SEARCH_INPUT;
        data: string;
      }
    | {
        type: EActionType.UPDATE_CART_PRICE;
        data: {
          id: number;
          quantity: number;
          price: number;
        };
      };

  export enum EActionType {
    CALL_GET_PRODUCTS = "callGetProducts",
    UPDATE_PRODUCTS = "updateProducts",
    UPDATE_PRODUCT = "updateProduct",
    UDPATE_PAGE = "updatePage",
    UPDATE_CART = "updateCart",
    UPDATE_CATEGORY = "updateCategory",
    UPDATE_SEARCH_INPUT = "updateSearchInput",
    UPDATE_CART_PRICE = "updateCartPrice",
  }
}
