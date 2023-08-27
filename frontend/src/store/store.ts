import { configureStore } from "@reduxjs/toolkit";

import bookReducer from "../reducers/bookReducer";
import authorReducer from "../reducers/authorReducer";

const store = configureStore({
  reducer: {
    bookReducer: bookReducer,
    authorReducer: authorReducer,
  },
});

export default store;
