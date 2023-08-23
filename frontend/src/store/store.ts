import { configureStore } from "@reduxjs/toolkit";

import bookReducer from "../reducers/bookReducer";

const store = configureStore({
  reducer: {
    bookReducer: bookReducer,
  },
});

export default store;
