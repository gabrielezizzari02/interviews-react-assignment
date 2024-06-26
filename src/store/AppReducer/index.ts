import { AppReducer } from "./interfaces";

export const initialState: AppReducer.State = {
  isLoading: false,
  page: 0,
  products: [],
  cartProducts: [],
  quantity: 0,
  hasProductsFinished: false,
  price: 0,
  isPriceLoading: false,
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
        products: action.data.products,
        isLoading: false,
        hasProductsFinished: !action.data.hasMore,
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
      newState.products = [...newState.products].map((item) => {
        const index = items.findIndex(
          (indexItem) => indexItem.product.id === item.id
        );
        return index !== -1
          ? {
              ...item,
              loading: false,
              itemInCart: items[index].quantity,
            }
          : item;
      });
      newState.price = totalPrice;
      newState.isPriceLoading = false;
      newState.lastItemClicked = undefined;
      newState.quantity = totalItems;
      return { ...newState };
    }
    case AppReducer.EActionType.UPDATE_CATEGORY: {
      const newState = { ...state };
      newState.category =
        action.data === newState.category ? undefined : action.data;
      newState.hasProductsFinished = false;
      newState.page = 0;
      newState.products = [];
      return { ...newState };
    }
    case AppReducer.EActionType.UPDATE_SEARCH_INPUT: {
      const newState = { ...state };
      newState.searchInput = action.data.length === 0 ? undefined : action.data;
      newState.page = 0;
      newState.products = [];
      return { ...newState };
    }
    case AppReducer.EActionType.UPDATE_CART_PRICE: {
      const newState = { ...state };
      newState.price = newState.price + action.data.price;
      newState.quantity = newState.quantity + action.data.quantity;
      newState.lastItemClicked = action.data.id;
      newState.isPriceLoading = true;
      return { ...newState };
    }
    default:
      return state;
  }
};

export default appReducer;
