import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Box, Grid, CircularProgress } from "@mui/material";
import Api from "../../api/index.ts";
import { GetProducts } from "../../api/getProducts/interfaces.ts";
import { useDispatch, useSelector } from "react-redux";
import { TState } from "../../store/index.ts";
import AppReducerActions from "../../store/Actions/AppReducer/index.ts";
import { AppReducer } from "../../store/AppReducer/interfaces.ts";
import LoadingProduct from "./components/LoadingProduct.tsx";
import { ICart, IProduct } from "../../interfaces.ts";
import { PostAddToCart } from "../../api/postAddToCart/interfaces.ts";
import _ from "lodash";
const Product = React.lazy(() => import("./components/Product.tsx"));

export const Products = () => {
  const [cartData, setCartData] = useState<
    PostAddToCart.Response | undefined
  >();
  const [product, setProduct] = useState<IProduct | undefined>(undefined);
  const componentRef = useRef<HTMLElement>();
  const dispatch = useDispatch();
  const appData: AppReducer.State = useSelector(
    (state: TState) => state.app
  ) as TState["app"];
  const {
    isLoading,
    page,
    category,
    hasProductsFinished,
    searchInput,
    isPriceLoading,
    price,
    products,
  } = appData;
  const LIMIT = 20;

  const callGetProducts = useCallback(async () => {
    try {
      if (isLoading) return;
      dispatch(AppReducerActions.callGetProductsAction());
      const payload: GetProducts.Payload = {
        page,
        limit: LIMIT,
        category,
        q: searchInput,
      };
      const res = await Api.getProducts(payload);
      const { data } = res;
      const responseProducts = data.products;
      const newItems = [...new Set([...products, ...responseProducts])];
      dispatch(AppReducerActions.updateProducts([...newItems], data.hasMore));
    } catch (e) {
      //error handling
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page, category, searchInput]);

  const callPostAddToCart = async (product: IProduct, quantity: number) => {
    try {
      const resCheck = await Api.getCart();
      const { data: dataCheck } = resCheck;
      const previousQuantity = dataCheck.items.find(
        (item) => item.product.id === product.id
      );
      const diffQuantity = quantity - (previousQuantity?.quantity || 0);
      const body: PostAddToCart.Body = {
        productId: product.id,
        quantity: diffQuantity,
      };
      const res = await Api.postAddToCart(body);
      const { data } = res;
      // const newProd: typeof product = {
      //   ...product,
      // };
      // dispatch(AppReducerActions.updateProduct(product));
      setCartData(data);
    } catch (e) {
      // handle error
    }
  };

  const addToCart = (productId: number, quantity: number) => {
    const currentProduct = products.find(
      (prod: IProduct) => prod.id === productId
    );
    if (!currentProduct) return;
    const newProd: typeof currentProduct = {
      ...currentProduct,
      itemInCart: (currentProduct.itemInCart || 0) + quantity,
    };
    setProduct(currentProduct);
    dispatch(AppReducerActions.updateProduct(newProd));
    dispatch(
      AppReducerActions.updateCartPrice(
        newProd.id,
        newProd.price * quantity,
        quantity
      )
    );
    //callPostAddToCart(newProd, quantity);
  };

  const onCartChange = (cart: ICart) => {
    dispatch(AppReducerActions.updateCart(cart));
  };

  const debouncedCartChange = _.debounce(onCartChange, 500);
  const debouncePostAddToCart = _.debounce(callPostAddToCart, 500);

  const handleBottomPage = useCallback(() => {
    dispatch(AppReducerActions.updatePage(page + 1));
  }, [page, dispatch]);

  // handle infinite Scroll without any other components
  useEffect(() => {
    if (!componentRef.current) return;
    const onscroll = () => {
      if (!componentRef.current) return;
      const scrolledTo =
        componentRef.current.scrollTop + componentRef.current.clientHeight;
      const isReachBottom = componentRef.current.scrollHeight === scrolledTo;
      if (isReachBottom && !hasProductsFinished) handleBottomPage();
    };
    componentRef.current.addEventListener("scroll", onscroll);
    return () => {
      if (!componentRef.current) return;
      componentRef.current.removeEventListener("scroll", onscroll);
    };
  });

  useEffect(() => {
    const fixedPrice = price.toFixed(2);
    const fixedCart = cartData?.totalPrice.toFixed(2);
    if (!cartData || fixedCart !== fixedPrice) return;
    cartData.totalPrice = Number(fixedCart);
    debouncedCartChange(cartData);
    () => {
      if (cartData?.totalPrice !== price) {
        debouncedCartChange.cancel();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartData?.totalPrice, cartData?.totalItems, isPriceLoading]);

  useEffect(() => {
    const currentProduct = products.find((item) => item.id === product?.id);
    if (!currentProduct || !product) return;
    debouncePostAddToCart(product, currentProduct.itemInCart);
    return () => {
      debouncePostAddToCart.cancel();
    };
  }, [product?.id, product?.itemInCart]);

  useEffect(() => {
    callGetProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, category, searchInput]);

  return (
    <Box overflow="scroll" height="100%" ref={componentRef}>
      {products.length !== 0 && (
        <Grid container spacing={2} p={2} height="100%" width="100%">
          {products.map((product) => (
            <Suspense
              fallback={<LoadingProduct />}
              key={`${product.id}${product.itemInCart}`}
            >
              <Product data={product} addToCart={addToCart} />
            </Suspense>
          ))}
        </Grid>
      )}
      {isLoading && (
        <Grid
          container
          justifyContent="center"
          sx={{
            my: 5,
          }}
        >
          <CircularProgress />
        </Grid>
      )}
    </Box>
  );
};
