import { useCallback, useEffect } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { HeavyComponent } from "./HeavyComponent.tsx";
import Api from "../api/index.ts";
import { GetProducts } from "../api/getProducts/interfaces.ts";
import { useDispatch, useSelector } from "react-redux";
import { TState } from "../store/index.ts";
import AppReducerActions from "../store/Actions/AppReducer/index.ts";
import { ICart, IProduct } from "../interfaces.ts";
import { PostAddToCart } from "../api/postAddToCart/interfaces.ts";
import { AppReducer } from "../store/AppReducer/interfaces.ts";

export const Products = () => {
  const dispatch = useDispatch();
  const appData: AppReducer.State = useSelector(
    (state: TState) => state.app
  ) as TState["app"];
  const { isLoading, products, page, category, hasProductsFinished } = appData;
  const LIMIT = 20;

  const callGetProducts = useCallback(async () => {
    try {
      if (isLoading) return;
      dispatch(AppReducerActions.callGetProductsAction());
      const payload: GetProducts.Payload = {
        page,
        limit: LIMIT,
        category,
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
  }, [dispatch, page, category]);

  const callPostAddToCart = async (product: IProduct, quantity: number) => {
    try {
      const body: PostAddToCart.Body = {
        productId: product.id,
        quantity,
      };
      const res = await Api.postAddToCart(body);
      const { data } = res;
      const newProd: typeof product = {
        ...product,
        loading: false,
        itemInCart: (product.itemInCart || 0) + quantity,
      };
      dispatch(AppReducerActions.updateProduct(newProd));
      onCartChange(data);
    } catch (e) {
      //handling error
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleBottomPage = useCallback(() => {
    dispatch(AppReducerActions.updatePage(page + 1));
  }, [page, dispatch]);

  const onCartChange = (cart: ICart) => {
    dispatch(AppReducerActions.updateCart(cart));
  };

  const addToCart = async (productId: number, quantity: number) => {
    const currentProduct = products.find(
      (prod: IProduct) => prod.id === productId
    );
    if (!currentProduct) return;
    const newProd: typeof currentProduct = {
      ...currentProduct,
      loading: true,
    };
    dispatch(AppReducerActions.updateProduct(newProd));
    await callPostAddToCart(newProd, quantity);
  };

  // handle infinite Scroll without any other components
  useEffect(() => {
    const onscroll = () => {
      const scrolledTo = window.scrollY + window.innerHeight;
      const isReachBottom = document.body.scrollHeight === scrolledTo;
      if (isReachBottom && !hasProductsFinished) handleBottomPage();
    };
    window.addEventListener("scroll", onscroll);
    return () => {
      window.removeEventListener("scroll", onscroll);
    };
  });

  useEffect(() => {
    callGetProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, category]);

  return (
    <Box overflow="auto" height="100%">
      <Grid container spacing={2} p={2}>
        {products.map((product: IProduct, index: number) => (
          <Grid item xs={4} key={index}>
            {/* Do not remove this */}
            <HeavyComponent />
            <Card key={product.id} style={{ width: "100%" }}>
              <CardMedia
                component="img"
                height="150"
                image={product.imageUrl}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                </Typography>
              </CardContent>
              <CardActions>
                <Typography variant="h6" component="div">
                  ${product.price}
                </Typography>
                <Box flexGrow={1} />
                <Box
                  position="relative"
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                >
                  <Box
                    position="absolute"
                    left={0}
                    right={0}
                    top={0}
                    bottom={0}
                    textAlign="center"
                  >
                    {product.loading && <CircularProgress size={20} />}
                  </Box>
                  <IconButton
                    disabled={product.loading}
                    aria-label="delete"
                    size="small"
                    onClick={() => addToCart(product.id, -1)}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>

                  <Typography variant="body1" component="div" mx={1}>
                    {product.itemInCart || 0}
                  </Typography>

                  <IconButton
                    disabled={product.loading}
                    aria-label="add"
                    size="small"
                    onClick={() => addToCart(product.id, 1)}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
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
