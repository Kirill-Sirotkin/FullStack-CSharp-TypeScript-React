import { configureStore } from "@reduxjs/toolkit";

import bookReducer from "../reducers/bookReducer";
import authorReducer from "../reducers/authorReducer";
import userReducer from "../reducers/userReducer";
import loanReducer from "../reducers/loanReducer";
import cartReducer from "../reducers/cartReducer";

const store = configureStore({
  reducer: {
    bookReducer: bookReducer,
    authorReducer: authorReducer,
    userReducer: userReducer,
    loanReducer: loanReducer,
    cartReducer: cartReducer,
  },
});

export default store;
