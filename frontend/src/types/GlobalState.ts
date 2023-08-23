import store from "../store/store";

type GlobalState = ReturnType<typeof store.getState>;
export default GlobalState;
