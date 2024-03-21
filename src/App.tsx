import { Products } from "./components/Products";
import { Box, CssBaseline } from "@mui/material";
import SearchAppBar from "./components/SearchAppBar.tsx";
import { Categories } from "./components/Categories.tsx";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    if (!document.body.parentElement) return;
    document.body.parentElement.style.overflow = "hidden";
  }, []);
  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <CssBaseline />
      <SearchAppBar />
      <Box height="100%" flex={1} display="flex" flexDirection="row">
        <Categories />
        <Box flex={1}>
          <Products />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
