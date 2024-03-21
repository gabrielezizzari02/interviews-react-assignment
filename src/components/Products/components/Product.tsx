import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
  CircularProgress,
  CardMedia,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { HeavyComponent } from "../../HeavyComponent.tsx";
import React, { memo } from "react";
import AppReducerActions from "../../../store/Actions/AppReducer/index.ts";
import { ICart, IProduct } from "../../../interfaces.ts";
import { useDispatch, useSelector } from "react-redux";
import { PostAddToCart } from "../../../api/postAddToCart/interfaces.ts";
import Api from "../../../api/index.ts";
import { TState } from "../../../store/index.ts";

interface ProductProps {
  data: IProduct;
}

const propsAreEqual = (
  prevProps: Readonly<ProductProps>,
  currentProps: Readonly<ProductProps>
) => {
  return (
    prevProps.data.id === currentProps.data.id &&
    prevProps.data.loading === currentProps.data.loading
  );
};

const Product: React.FC<ProductProps> = memo((props) => {
  const { data } = props;
  const dispatch = useDispatch();
  const { products } = useSelector((state: TState) => state.app);
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

  const onCartChange = (cart: ICart) => {
    dispatch(AppReducerActions.updateCart(cart));
  };

  return (
    <Grid item xs={4}>
      {/* Do not remove this */}
      <HeavyComponent />
      <Card style={{ width: "100%" }}>
        <CardMedia
          component="img"
          height="150"
          src={data.imageUrl}
          loading="lazy"
        />

        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {data.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          </Typography>
        </CardContent>
        <CardActions>
          <Typography variant="h6" component="div">
            ${data.price}
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
              {data.loading && <CircularProgress size={20} />}
            </Box>
            <IconButton
              disabled={data.loading}
              aria-label="delete"
              size="small"
              onClick={() => addToCart(data.id, -1)}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>

            <Typography variant="body1" component="div" mx={1}>
              {data.itemInCart || 0}
            </Typography>

            <IconButton
              disabled={data.loading}
              aria-label="add"
              size="small"
              onClick={() => addToCart(data.id, 1)}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
}, propsAreEqual);

export default Product;
