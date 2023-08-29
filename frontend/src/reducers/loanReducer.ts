import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import IdAndToken from "../types/IdAndToken";
import Loan from "../types/Loan";
import LoanCreateUpdateInfo from "../types/LoanCreateUpdateInfo";

interface LoanReducer {
  loans: Loan[];
  loanById: Loan;
  updateSuccessful?: boolean;
  deleteSuccessful?: boolean;
}

const initialState: LoanReducer = {
  loans: [],
  loanById: {
    id: "",
    userId: "",
    bookId: "",
    takenDate: "",
    dueDate: "",
    status: 0,
  },
};

const loanSlice = createSlice({
  name: "loans",
  initialState: initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(getLoans.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        console.log(action.payload.message);
      } else {
        state.loans = action.payload;
      }
    });
    build.addCase(getLoanById.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        console.log(action.payload.message);
      } else {
        state.loanById = action.payload;
      }
    });
    // build.addCase(createProduct.fulfilled, (state, action) => {
    //   if (action.payload instanceof AxiosError) {
    //     console.log(action.payload.message);
    //     state.createResultMessage = action.payload.message;
    //   } else {
    //     state.createdProduct = action.payload;
    //   }
    // });
    build.addCase(updateLoan.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        console.log(action.payload.message);
        state.updateSuccessful = false;
      } else {
        state.updateSuccessful = true;
      }
    });
    build.addCase(deleteLoan.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        console.log(action.payload.message);
        state.deleteSuccessful = false;
      } else {
        state.deleteSuccessful = true;
      }
    });
  },
});

export const getLoans = createAsyncThunk(
  "getLoans",
  async (token?: string | null) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const result = await axios.get<Loan[]>(
        "https://lirbarymanagementproject.azurewebsites.net/api/v1/Loans",
        config
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const getLoanById = createAsyncThunk(
  "getLoanById",
  async (idAndToken: IdAndToken) => {
    const config = {
      headers: {
        Authorization: `Bearer ${idAndToken.token}`,
      },
    };
    try {
      const result = await axios.get<Loan>(
        `https://lirbarymanagementproject.azurewebsites.net/api/v1/Loans/${idAndToken.id}`,
        config
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

// export const createProduct = createAsyncThunk(
//   "createProduct",
//   async (product: ProductCreateInfo) => {
//     try {
//       const result = await axios.post<Product>(
//         "https://api.escuelajs.co/api/v1/products/",
//         product
//       );
//       return result.data;
//     } catch (e) {
//       const error = e as AxiosError;
//       return error;
//     }
//   }
// );

export const updateLoan = createAsyncThunk(
  "updateLoan",
  async (updateInfo: {
    loan: LoanCreateUpdateInfo;
    idAndToken: IdAndToken;
  }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${updateInfo.idAndToken.token}`,
      },
    };
    try {
      const result = await axios.patch<Loan>(
        `https://lirbarymanagementproject.azurewebsites.net/api/v1/Loans/${updateInfo.idAndToken.id}`,
        updateInfo.loan,
        config
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const deleteLoan = createAsyncThunk(
  "deleteLoan",
  async (idAndToken: IdAndToken) => {
    const config = {
      headers: {
        Authorization: `Bearer ${idAndToken.token}`,
      },
    };
    try {
      const result = await axios.delete<boolean>(
        `https://lirbarymanagementproject.azurewebsites.net/api/v1/Loans/${idAndToken.id}`,
        config
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

const loanReducer = loanSlice.reducer;
// export const { sortProducts, setProductsOnPage, resetDeleteStatus } =
//     bookSlice.actions;
export default loanReducer;
