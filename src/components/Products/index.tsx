import React, { Suspense, useCallback, useEffect, useRef } from "react";
import { Box, Grid, CircularProgress } from "@mui/material";
import Api from "../../api/index.ts";
import { GetProducts } from "../../api/getProducts/interfaces.ts";
import { useDispatch, useSelector } from "react-redux";
import { TState } from "../../store/index.ts";
import AppReducerActions from "../../store/Actions/AppReducer/index.ts";
import { AppReducer } from "../../store/AppReducer/interfaces.ts";
import LoadingProduct from "./components/LoadingProduct.tsx";
const Product = React.lazy(() => import("./components/Product.tsx"));

export const Products = () => {
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
    callGetProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, category, searchInput]);

  return (
    <Box overflow="auto" height="100%" ref={componentRef}>
      {products.length !== 0 && (
        <Grid container spacing={2} p={2}>
          {products.map((product) => (
            <Suspense fallback={<LoadingProduct />} key={product.id}>
              <Product data={product} />
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
