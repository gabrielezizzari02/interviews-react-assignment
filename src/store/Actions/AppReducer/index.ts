import { ICart, IProduct } from "../../../interfaces";
import { AppReducer } from "../../AppReducer/interfaces";

const callGetProductsAction = (): AppReducer.Action => {
  return {
    type: AppReducer.EActionType.CALL_GET_PRODUCTS,
  };
};

const updateProducts = (products: IProduct[]): AppReducer.Action => {
  return {
    type: AppReducer.EActionType.UPDATE_PRODUCTS,
    data: products,
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

const AppReducerActions = {
  callGetProductsAction,
  updateProducts,
  updateProduct,
  updatePage,
  updateCart,
};

export default AppReducerActions;
