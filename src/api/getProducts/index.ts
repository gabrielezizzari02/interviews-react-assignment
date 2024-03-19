import axios, { AxiosResponse } from "axios";
import ENDPOINTS from "../endpoints";
import { GetProducts } from "./interfaces";

const getProducts = (
  payload: GetProducts.Payload
): Promise<AxiosResponse<GetProducts.Response>> => {
  return axios.get(ENDPOINTS.PRODUCTS, {
    params: payload,
  });
};

export default getProducts;
