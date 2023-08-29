import { configureStore } from "@reduxjs/toolkit";

import bookReducer from "../reducers/bookReducer";
import authorReducer from "../reducers/authorReducer";
import userReducer from "../reducers/userReducer";
import loanReducer from "../reducers/loanReducer";

const store = configureStore({
  reducer: {
    bookReducer: bookReducer,
    authorReducer: authorReducer,
    userReducer: userReducer,
    loanReducer: loanReducer,
  },
});

export default store;
