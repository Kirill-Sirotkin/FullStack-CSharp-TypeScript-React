import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Author from "../types/Author";
import axios, { AxiosError } from "axios";

interface AuthorReducer {
  authors: Author[];
  authorById: Author;
}

const initialState: AuthorReducer = {
  authors: [],
  authorById: {
    id: "",
    firstName: "",
    lastName: "",
    biography: "",
    bookTitles: [],
    bookIds: [],
  },
};

const authorSlice = createSlice({
  name: "authors",
  initialState: initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(getAuthors.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        console.log(action.payload.message);
      } else {
        state.authors = action.payload;
      }
    });
    build.addCase(getAuthorById.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        console.log(action.payload.message);
      } else {
        state.authorById = action.payload;
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

export const getAuthors = createAsyncThunk("getAuthors", async () => {
  try {
    const result = await axios.get<Author[]>(
      "https://lirbarymanagementproject.azurewebsites.net/api/v1/Authors"
    );
    return result.data;
  } catch (e) {
    const error = e as AxiosError;
    return error;
  }
});

export const getAuthorById = createAsyncThunk(
  "getAuthorById",
  async (id: string) => {
    try {
      const result = await axios.get<Author>(
        `https://lirbarymanagementproject.azurewebsites.net/api/v1/Authors/${id}`
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

const authorReducer = authorSlice.reducer;
// export const { sortProducts, setProductsOnPage, resetDeleteStatus } =
//     bookSlice.actions;
export default authorReducer;
