import { AppReducer } from "./interfaces";

export const initialState: AppReducer.State = {
  isLoading: false,
  page: 0,
  products: [],
  cartProducts: [],
  quantity: 0,
  price: 0,
};

const appReducer = (
  state: AppReducer.State = initialState,
  action: AppReducer.Action
) => {
  switch (action.type) {
    case AppReducer.EActionType.CALL_GET_PRODUCTS: {
      const newState: AppReducer.State = {
        ...state,
        isLoading: true,
      };
      return { ...newState };
    }
    case AppReducer.EActionType.UPDATE_PRODUCTS: {
      const newState: AppReducer.State = {
        ...state,
        products: action.data,
        isLoading: false,
      };
      return { ...newState };
    }
    case AppReducer.EActionType.UPDATE_PRODUCT: {
      const newState = { ...state };
      const newProds = [...newState.products].map((prod) =>
        prod.id === action.data.id ? action.data : prod
      );
      return { ...newState, products: newProds };
    }
    case AppReducer.EActionType.UDPATE_PAGE: {
      const newState: AppReducer.State = {
        ...state,
        page: action.data,
      };
      return { ...newState };
    }
    case AppReducer.EActionType.UPDATE_CART: {
      const { items, totalItems, totalPrice } = action.data;
      const newState = { ...state };
      newState.cartProducts = items;
      newState.price = totalPrice;
      newState.quantity = totalItems;
      return { ...newState };
    }
    default:
      return state;
  }
};

export default appReducer;
