import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appReducer from "./AppReducer";

const rootReducer = combineReducers({
  app: appReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type TState = ReturnType<typeof store.getState>;
