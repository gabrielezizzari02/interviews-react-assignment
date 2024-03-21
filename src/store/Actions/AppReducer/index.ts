import { ICart, IProduct } from "../../../interfaces";
import { AppReducer } from "../../AppReducer/interfaces";

const callGetProductsAction = (): AppReducer.Action => {
  return {
    type: AppReducer.EActionType.CALL_GET_PRODUCTS,
  };
};

const updateProducts = (
  products: IProduct[],
  hasMore: boolean
): AppReducer.Action => {
  return {
    type: AppReducer.EActionType.UPDATE_PRODUCTS,
    data: {
      products,
      hasMore,
    },
  };
};

const updateProduct = (product: IProduct): AppReducer.Action => {
  return {
    type: AppReducer.EActionType.UPDATE_PRODUCT,
    data: product,
  };
};

const updatePage = (page: number): AppReducer.Action => {
  return {
    type: AppReducer.EActionType.UDPATE_PAGE,
    data: page,
  };
};

const updateCart = (cart: ICart): AppReducer.Action => {
  return {
    type: AppReducer.EActionType.UPDATE_CART,
    data: cart,
  };
};

const updateCategory = (category: string) => {
  return {
    type: AppReducer.EActionType.UPDATE_CATEGORY,
    data: category,
  };
};

const updateInputSearch = (value: string): AppReducer.Action => {
  return {
    type: AppReducer.EActionType.UPDATE_SEARCH_INPUT,
    data: value,
  };
};

const updateCartPrice = (
  id: number,
  price: number,
  quantity: number
): AppReducer.Action => {
  return {
    type: AppReducer.EActionType.UPDATE_CART_PRICE,
    data: {
      id,
      price,
      quantity,
    },
  };
};

const AppReducerActions = {
  callGetProductsAction,
  updateProducts,
  updateProduct,
  updatePage,
  updateCart,
  updateCategory,
  updateInputSearch,
  updateCartPrice,
};

export default AppReducerActions;
