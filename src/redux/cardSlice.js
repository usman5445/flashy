import { configureStore, createSlice, nanoid } from "@reduxjs/toolkit";

// slice
const cardSlice = createSlice({
  name: "cards",
  initialState: JSON.parse(localStorage.getItem("cards")) || [],
  reducers: {
    addCard: (state, action) => {
      const newCard = {
        id: nanoid(),
        ...action.payload,
        createdAt: new Date().toISOString(),
      };
      state.push(newCard);
    },
  },
});

export const { addCard } = cardSlice.actions;
export const cardReducer = cardSlice.reducer;

// store
export const store = configureStore({
  reducer: cardReducer,
});

// store subscriber to update localstorage on each updation of state
store.subscribe(() =>
  localStorage.setItem("cards", JSON.stringify(store.getState()))
);
