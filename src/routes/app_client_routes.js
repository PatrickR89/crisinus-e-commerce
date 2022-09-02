import { Route } from "react-router-dom";
import { CurrentAuthor } from "../components/public/authors";

import {
  BooksPage,
  GiftshopPage,
  SingleBookPage,
  SingleGiftPage
} from "../pages/products";

import {
  AboutUsPage,
  DisclaimerPage,
  InfoPage,
  OrderPage,
  PaymentPage,
  ContactPage
} from "../pages/information";

import {
  NewsPage,
  ReviewsPage,
  AuthorsPage,
  CartPage,
  NewsExpandedPage
} from "../pages/product_related";

const ClientRoutes = (
  <>
    <Route path="/about" element={<AboutUsPage />} />{" "}
    <Route path="/books" element={<BooksPage />} />
    <Route path="/books/:id" element={<SingleBookPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/disclaimer" element={<DisclaimerPage />} />{" "}
    <Route path="/giftshop" element={<GiftshopPage />} />{" "}
    <Route path="/giftshop/:id" element={<SingleGiftPage />} />{" "}
    <Route path="/info" element={<InfoPage />} />
    <Route exact path="/news" element={<NewsPage />} />{" "}
    <Route exact path="/news/:id" element={<NewsExpandedPage />} />
    <Route path="/order" element={<OrderPage />} />{" "}
    <Route path="/payment" element={<PaymentPage />} />{" "}
    <Route path="/reviews" element={<ReviewsPage />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/authors" element={<AuthorsPage />}>
      <Route path=":id" element={<CurrentAuthor />} />{" "}
    </Route>
  </>
);

export default ClientRoutes;
