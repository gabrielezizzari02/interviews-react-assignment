import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useDispatch } from "react-redux";
import AppReducerActions from "../store/Actions/AppReducer";

const drawerWidth = 180;

const categories = [
  "Fruit",
  "Vegetables",
  "Dairy",
  "Bakery",
  "Meat",
  "Seafood",
  "Snacks",
  "Beverages",
];

export const Categories = () => {
  const dispatch = useDispatch();
  const handleCategoryClick = (category: string) => {
    dispatch(AppReducerActions.updateCategory(category));
  };
  return (
    <Box minWidth={drawerWidth} sx={{ borderRight: "1px solid grey" }}>
      <List>
        {categories.map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleCategoryClick(text)}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
