import { configureStore, createSlice } from "@reduxjs/toolkit";

// slice
const cardSlice = createSlice({
  name: "counter_slice",
  initialState: JSON.parse(localStorage.getItem("cards")) || [],
  reducers: {
    addCard: (state, payload) => {
      state.push(payload);
    },
  },
});

// store
export const store = configureStore({
  reducer: cardSlice.reducer,
});

// store subscriber to update localstorage on each updation of state
store.subscribe(() =>
  localStorage.setItem("cards", JSON.stringify(store.getState()))
);
