import cartReducer, {
  CartProduct,
  addProductToCart,
  clearCart,
  removeProductFromCart,
  updateCartProduct,
} from "../../reducers/cartReducer";
import Book from "../../types/Book";

describe("Testing cartReducer", () => {
  test("Check initialState", () => {
    const state = cartReducer(undefined, { type: "unknown" });
    expect(state).toEqual({
      products: [],
    });
  });
  test("Check add product to cart", () => {
    const product1: CartProduct = {
      product: {
        id: "6e20b9ec-999b-42ab-b41c-56f7886763c6",
        title: "book 1",
        isbn: "1234",
        description: "",
        publishedDate: "",
        authorNames: [],
        authorIds: [],
        quantity: 1,
      },
      count: 1,
    };
    const product2: Book = {
      id: "fd3c36fc-626e-40fb-aac8-22dfec20e71b",
      title: "book 2",
      isbn: "4567",
      description: "",
      publishedDate: "",
      authorNames: [],
      authorIds: [],
      quantity: 1,
    };
    const state = cartReducer(
      { products: [product1] },
      addProductToCart(product2)
    );
    console.log(state.products);
    expect(state.products).toEqual([product1, { product: product2, count: 1 }]);
  });
  test("Check remove product from cart", () => {
    const product1: CartProduct = {
      product: {
        id: "6e20b9ec-999b-42ab-b41c-56f7886763c6",
        title: "book 1",
        isbn: "1234",
        description: "",
        publishedDate: "",
        authorNames: [],
        authorIds: [],
        quantity: 1,
      },
      count: 1,
    };
    const product2: CartProduct = {
      product: {
        id: "fd3c36fc-626e-40fb-aac8-22dfec20e71b",
        title: "book 2",
        isbn: "4567",
        description: "",
        publishedDate: "",
        authorNames: [],
        authorIds: [],
        quantity: 1,
      },
      count: 1,
    };
    const state = cartReducer(
      { products: [product1, product2] },
      removeProductFromCart("fd3c36fc-626e-40fb-aac8-22dfec20e71b")
    );
    expect(state.products).toEqual([product1]);
  });
  test("Check add product in cart", () => {
    const product1: CartProduct = {
      product: {
        id: "6e20b9ec-999b-42ab-b41c-56f7886763c6",
        title: "book 1",
        isbn: "1234",
        description: "",
        publishedDate: "",
        authorNames: [],
        authorIds: [],
        quantity: 1,
      },
      count: 1,
    };
    const product2: CartProduct = {
      product: {
        id: "fd3c36fc-626e-40fb-aac8-22dfec20e71b",
        title: "book 2",
        isbn: "4567",
        description: "",
        publishedDate: "",
        authorNames: [],
        authorIds: [],
        quantity: 1,
      },
      count: 1,
    };
    const state = cartReducer(
      { products: [product1, product2] },
      updateCartProduct({
        id: "fd3c36fc-626e-40fb-aac8-22dfec20e71b",
        count: 2,
      })
    );
    expect(state.products).toEqual([
      product1,
      { product: product2.product, count: 3 },
    ]);
  });
  test("Check subtract product in cart", () => {
    const product1: CartProduct = {
      product: {
        id: "6e20b9ec-999b-42ab-b41c-56f7886763c6",
        title: "book 1",
        isbn: "1234",
        description: "",
        publishedDate: "",
        authorNames: [],
        authorIds: [],
        quantity: 1,
      },
      count: 1,
    };
    const product2: CartProduct = {
      product: {
        id: "fd3c36fc-626e-40fb-aac8-22dfec20e71b",
        title: "book 2",
        isbn: "4567",
        description: "",
        publishedDate: "",
        authorNames: [],
        authorIds: [],
        quantity: 1,
      },
      count: 5,
    };
    const state = cartReducer(
      { products: [product1, product2] },
      updateCartProduct({
        id: "fd3c36fc-626e-40fb-aac8-22dfec20e71b",
        count: -3,
      })
    );
    expect(state.products).toEqual([
      product1,
      { product: product2.product, count: 2 },
    ]);
  });
  test("Check clear cart", () => {
    const product1: CartProduct = {
      product: {
        id: "6e20b9ec-999b-42ab-b41c-56f7886763c6",
        title: "book 1",
        isbn: "1234",
        description: "",
        publishedDate: "",
        authorNames: [],
        authorIds: [],
        quantity: 1,
      },
      count: 1,
    };
    const product2: CartProduct = {
      product: {
        id: "fd3c36fc-626e-40fb-aac8-22dfec20e71b",
        title: "book 2",
        isbn: "4567",
        description: "",
        publishedDate: "",
        authorNames: [],
        authorIds: [],
        quantity: 1,
      },
      count: 1,
    };
    const state = cartReducer({ products: [product1, product2] }, clearCart());
    expect(state.products).toEqual([]);
  });
});
