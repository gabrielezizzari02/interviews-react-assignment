import axios, { AxiosResponse } from "axios";
import ENDPOINTS from "../endpoints";
import { PostAddToCart } from "./interfaces";

const postAddToCart = (
  body: PostAddToCart.Body
): Promise<AxiosResponse<PostAddToCart.Response>> => {
  return axios.post(
    ENDPOINTS.CART,
    JSON.stringify({ quantity: body.quantity, productId: body.productId }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export default postAddToCart;
