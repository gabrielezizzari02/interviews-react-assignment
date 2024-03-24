import axios, { AxiosResponse } from "axios";
import ENDPOINTS from "../endpoints";
import { GetCart } from "./interfaces";

const getCart = (): Promise<AxiosResponse<GetCart.Response>> => {
  return axios.get(ENDPOINTS.CART);
};

export default getCart;
