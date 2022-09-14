import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./reducer/loading";

export default configureStore({
  reducer: {
    loading: loadingReducer,
  },
});
