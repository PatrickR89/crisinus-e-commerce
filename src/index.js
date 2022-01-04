import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { CartProvider } from "./contexts/cart_context";
import { BooksProvider } from "./contexts/books_context";
import { GiftshopProvider } from "./contexts/giftshop_context";
import { FilterProvider } from "./contexts/filter_context";

ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
      <BooksProvider>
        <GiftshopProvider>
          <FilterProvider>
            <Router>
              <App />
            </Router>
          </FilterProvider>
        </GiftshopProvider>
      </BooksProvider>
    </CartProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
