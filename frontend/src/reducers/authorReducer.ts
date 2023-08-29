import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Author from "../types/Author";
import axios, { AxiosError } from "axios";
import AuthorCreateUpdateInfo from "../types/AuthorCreateUpdateInfo";
import IdAndToken from "../types/IdAndToken";

interface AuthorReducer {
  authors: Author[];
  authorById: Author;
  updateSuccessful?: boolean;
  deleteSuccessful?: boolean;
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
    build.addCase(updateAuthor.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        console.log(action.payload.message);
        state.updateSuccessful = false;
      } else {
        state.updateSuccessful = true;
      }
    });
    build.addCase(deleteAuthor.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        console.log(action.payload.message);
        state.deleteSuccessful = false;
      } else {
        state.deleteSuccessful = true;
      }
    });
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

export const updateAuthor = createAsyncThunk(
  "updateAuthor",
  async (updateInfo: {
    author: AuthorCreateUpdateInfo;
    idAndToken: IdAndToken;
  }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${updateInfo.idAndToken.token}`,
      },
      data: updateInfo.author,
    };
    try {
      const result = await axios.patch<Author>(
        `https://lirbarymanagementproject.azurewebsites.net/api/v1/Authors/${updateInfo.idAndToken.id}`,
        config
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const deleteAuthor = createAsyncThunk(
  "deleteAuthor",
  async (idAndToken: IdAndToken) => {
    const config = {
      headers: {
        Authorization: `Bearer ${idAndToken.token}`,
      },
    };
    try {
      const result = await axios.delete<boolean>(
        `https://lirbarymanagementproject.azurewebsites.net/api/v1/Authors/${idAndToken.id}`,
        config
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

const authorReducer = authorSlice.reducer;
// export const { sortProducts, setProductsOnPage, resetDeleteStatus } =
//     bookSlice.actions;
export default authorReducer;
