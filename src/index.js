import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { CartProvider } from "./contexts/cart_context";
import { ItemsProvider } from "./contexts/items_context";
import { FilterProvider } from "./contexts/filter_context";
import { CurrencyProvider } from "./contexts/currency_context";
import { LanguageProvider } from "./contexts/language_context";
import { SidebarProvider } from "./contexts/sidebar_context";
import { AuthorsProvider } from "./contexts/authors_context";
import { ReviewsProvider } from "./contexts/reviews_context";

ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
      <AuthorsProvider>
        <ItemsProvider>
          <ReviewsProvider>
            <FilterProvider>
              <CurrencyProvider>
                <LanguageProvider>
                  <SidebarProvider>
                    <Router>
                      <App />
                    </Router>
                  </SidebarProvider>
                </LanguageProvider>
              </CurrencyProvider>
            </FilterProvider>
          </ReviewsProvider>
        </ItemsProvider>
      </AuthorsProvider>
    </CartProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
