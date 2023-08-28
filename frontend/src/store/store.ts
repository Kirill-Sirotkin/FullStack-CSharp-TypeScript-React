import { configureStore } from "@reduxjs/toolkit";

import bookReducer from "../reducers/bookReducer";
import authorReducer from "../reducers/authorReducer";
import userReducer from "../reducers/userReducer";

const store = configureStore({
  reducer: {
    bookReducer: bookReducer,
    authorReducer: authorReducer,
    userReducer: userReducer,
  },
});

export default store;
