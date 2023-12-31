import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Book from "../types/Book";
import axios, { AxiosError } from "axios";
import BookCreateUpdateInfo from "../types/BookCreateUpdateInfo";
import IdAndToken from "../types/IdAndToken";

interface BookReducer {
  books: Book[];
  bookById: Book;
  updateSuccessful?: boolean;
  deleteSuccessful?: boolean;
}

const initialState: BookReducer = {
  books: [],
  bookById: {
    id: "",
    title: "",
    isbn: "",
    description: "",
    publishedDate: "",
    authorNames: [],
    authorIds: [],
    quantity: 0,
  },
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
    build.addCase(getBookById.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        console.log(action.payload.message);
      } else {
        state.bookById = action.payload;
      }
    });
    build.addCase(createBook.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        console.log(action.payload.message);
      } else {
        console.log(action.payload);
      }
    });
    build.addCase(updateBook.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        console.log(action.payload.message);
        state.updateSuccessful = false;
      } else {
        state.updateSuccessful = true;
      }
    });
    build.addCase(deleteBook.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        console.log(action.payload.message);
        state.deleteSuccessful = false;
      } else {
        state.deleteSuccessful = true;
      }
    });
  },
});

export const getBooks = createAsyncThunk("getBooks", async (params: string) => {
  try {
    const result = await axios.get<Book[]>(
      `https://lirbarymanagementproject.azurewebsites.net/api/v1/Books${
        params !== "" ? `?${params}` : ""
      }`
    );
    return result.data;
  } catch (e) {
    const error = e as AxiosError;
    return error;
  }
});

export const getBookById = createAsyncThunk(
  "getBookById",
  async (id: string) => {
    try {
      const result = await axios.get<Book>(
        `https://lirbarymanagementproject.azurewebsites.net/api/v1/Books/${id}`
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const createBook = createAsyncThunk(
  "createBook",
  async (createInfo: { book: BookCreateUpdateInfo; token: string }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${createInfo.token}`,
      },
    };
    try {
      const result = await axios.post<Book>(
        "https://lirbarymanagementproject.azurewebsites.net/api/v1/Books",
        createInfo.book,
        config
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const updateBook = createAsyncThunk(
  "updateBook",
  async (updateInfo: {
    book: BookCreateUpdateInfo;
    idAndToken: IdAndToken;
  }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${updateInfo.idAndToken.token}`,
      },
    };
    try {
      const result = await axios.patch<Book>(
        `https://lirbarymanagementproject.azurewebsites.net/api/v1/Books/${updateInfo.idAndToken.id}`,
        updateInfo.book,
        config
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const deleteBook = createAsyncThunk(
  "deleteBook",
  async (idAndToken: IdAndToken) => {
    const config = {
      headers: {
        Authorization: `Bearer ${idAndToken.token}`,
      },
    };
    try {
      const result = await axios.delete<boolean>(
        `https://lirbarymanagementproject.azurewebsites.net/api/v1/Books/${idAndToken.id}`,
        config
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

const bookReducer = bookSlice.reducer;
// export const { sortProducts, setProductsOnPage, resetDeleteStatus } =
//     bookSlice.actions;
export default bookReducer;
