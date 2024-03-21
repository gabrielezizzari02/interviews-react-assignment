import { Card, CardContent, CircularProgress, Grid } from "@mui/material";

const LoadingProduct = () => {
  return (
    <Grid item xs={4}>
      <Card style={{ width: "100%", height: 309 }}>
        <CardContent>
          <Grid container justifyContent="center" alignItems="center">
            <CircularProgress />
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default LoadingProduct;
