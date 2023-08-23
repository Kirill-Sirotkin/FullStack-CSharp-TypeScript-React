import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Book from "../types/Book";
import axios, { AxiosError } from "axios";

interface BookReducer {
  books: Book[];
}

const initialState: BookReducer = {
  books: [],
};

const bookSlice = createSlice({
  name: "books",
  initialState: initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(getBooks.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        console.log(action.payload.message);
      } else {
        state.books = action.payload;
      }
    });
    // build.addCase(getProductById.fulfilled, (state, action) => {
    //   if (action.payload instanceof AxiosError) {
    //     console.log(action.payload.message);
    //   } else {
    //     state.productById = action.payload;
    //   }
    // });
    // build.addCase(createProduct.fulfilled, (state, action) => {
    //   if (action.payload instanceof AxiosError) {
    //     console.log(action.payload.message);
    //     state.createResultMessage = action.payload.message;
    //   } else {
    //     state.createdProduct = action.payload;
    //   }
    // });
    // build.addCase(updateProduct.fulfilled, (state, action) => {
    //   if (action.payload instanceof AxiosError) {
    //     console.log(action.payload.message);
    //     state.updateResultMessage = action.payload.message;
    //   } else {
    //     state.updatedProduct = action.payload;
    //   }
    // });
    // build.addCase(deleteProduct.fulfilled, (state, action) => {
    //   if (action.payload instanceof AxiosError) {
    //     console.log(action.payload.message);
    //   } else {
    //     state.deleteSuccess = action.payload;
    //   }
    // });
  },
});

export const getBooks = createAsyncThunk("getBooks", async () => {
  try {
    const result = await axios.get<Book[]>(
      "https://lirbarymanagementproject.azurewebsites.net/api/v1/Books"
    );
    return result.data;
  } catch (e) {
    const error = e as AxiosError;
    return error;
  }
});

// export const getProductById = createAsyncThunk(
//   "getProductById",
//   async (id: number) => {
//     try {
//       const result = await axios.get<Product>(
//         `https://api.escuelajs.co/api/v1/products/${id}`
//       );
//       return result.data;
//     } catch (e) {
//       const error = e as AxiosError;
//       return error;
//     }
//   }
// );

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

// export const updateProduct = createAsyncThunk(
//   "updateProduct",
//   async (updateInfo: { product: ProductUpdateInfo; id: number }) => {
//     try {
//       const result = await axios.put<Product>(
//         `https://api.escuelajs.co/api/v1/products/${updateInfo.id}`,
//         updateInfo.product
//       );
//       return result.data;
//     } catch (e) {
//       const error = e as AxiosError;
//       return error;
//     }
//   }
// );

// export const deleteProduct = createAsyncThunk(
//   "deleteProduct",
//   async (id: number) => {
//     try {
//       const result = await axios.delete<boolean>(
//         `https://api.escuelajs.co/api/v1/products/${id}`
//       );
//       return result.data;
//     } catch (e) {
//       const error = e as AxiosError;
//       return error;
//     }
//   }
// );

const bookReducer = bookSlice.reducer;
// export const { sortProducts, setProductsOnPage, resetDeleteStatus } =
//     bookSlice.actions;
export default bookReducer;
