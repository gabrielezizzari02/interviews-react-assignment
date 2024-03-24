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
import { IProduct } from "../../../interfaces.ts";

interface ProductProps {
  data: IProduct;
  addToCart: (productId: number, quantity: number) => void;
}

const propsAreEqual = (
  prevProps: Readonly<ProductProps>,
  currentProps: Readonly<ProductProps>
) => {
  const {
    data: { id, loading, itemInCart },
  } = prevProps;
  const {
    data: { id: idCur, loading: curLoad, itemInCart: curCart },
  } = currentProps;
  return id === idCur && loading === curLoad && itemInCart === curCart;
};

const Product: React.FC<ProductProps> = memo((props) => {
  const { data, addToCart } = props;

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
              disabled={
                data.loading || !data.itemInCart || data.itemInCart <= 0
              }
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
