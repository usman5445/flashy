import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { cardReducer } from "../redux/cardSlice";

export function createTestStore(preloadedState = []) {
  return configureStore({
    reducer: cardReducer,
    preloadedState,
  });
}

export function renderWithProviders(
  ui,
  { route = "/", store = createTestStore(), ...options } = {}
) {
  const result = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </Provider>,
    options
  );

  return { store, ...result };
}
