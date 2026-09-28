import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/cardSlice";
import CreateCard from "./pages/CreateCard";
import MyCards from "./pages/MyCards";
import MyCardDetails from "./pages/MyCardDetails";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<CreateCard />} />
            <Route path="my-cards" element={<MyCards />} />
            <Route path="my-cards/:id" element={<MyCardDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
