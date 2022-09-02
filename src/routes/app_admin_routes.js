import React from "react";
import { Route } from "react-router-dom";

import Login from "../components/authentication/Login";

import {
  EditInfo,
  ListInfo,
  ImageList,
  ListLinks,
  EditLinks
} from "../components/admin/info";
import { AddBook, BookList, EditBook } from "../components/admin/books";
import { GiftshopList, EditGift, AddGift } from "../components/admin/giftshop";
import { AuthorsList, EditAuthor } from "../components/admin/authors";
import { AddNews, EditNews, ListNews } from "../components/admin/news";
import {
  AddRating,
  EditRating,
  ListRatings
} from "../components/admin/ratings";
import { OrderList, SingleOrder } from "../components/admin/orders";
import { MessageList } from "../components/admin/messages";

import { ContextWrapper } from "../components/admin/elements";
import { AuthorsAdminProvider } from "../contexts/admin/authors_context";
import { BooksProvider } from "../contexts/admin/books_context";
import { GiftshopProvider } from "../contexts/admin/giftshop_context";
import { NewsProvider } from "../contexts/admin/news_context";
import { ReviewsProvider } from "../contexts/admin/reviews_context";
import { InfoProvider } from "../contexts/admin/info_context";
import { ClientsProvider } from "../contexts/admin/clients_context";

const AdminRoutes = (
  <>
    <Route
      path="authors"
      element={<ContextWrapper Context={AuthorsAdminProvider} />}
    >
      <Route path="list" element={<AuthorsList />} />
      <Route path=":id" element={<EditAuthor />} />
    </Route>
    <Route path="books" element={<ContextWrapper Context={BooksProvider} />}>
      <Route path="add" element={<AddBook />} />
      <Route path="list" element={<BookList />} />
      <Route path=":id" element={<EditBook />} />
    </Route>
    <Route
      path="giftshop"
      element={<ContextWrapper Context={GiftshopProvider} />}
    >
      <Route path="add" element={<AddGift />} />
      <Route path="list" element={<GiftshopList />} />
      <Route path=":id" element={<EditGift />} />
    </Route>
    <Route path="news" element={<ContextWrapper Context={NewsProvider} />}>
      <Route path="add" element={<AddNews />} />
      <Route path="list" element={<ListNews />} />
      <Route path=":id" element={<EditNews />} />
    </Route>
    <Route
      path="reviews"
      element={<ContextWrapper Context={ReviewsProvider} />}
    >
      <Route path="add" element={<AddRating />} />
      <Route path="list" element={<ListRatings />} />
      <Route path=":id" element={<EditRating />} />
    </Route>
    <Route
      path="information"
      element={<ContextWrapper Context={InfoProvider} />}
    >
      <Route path="info" element={<ListInfo />} />
      <Route path="links" element={<ListLinks />} />
      <Route path="info/:id" element={<EditInfo />} />
      <Route path="link/:id" element={<EditLinks />} />
    </Route>
    <Route
      path="clients"
      element={<ContextWrapper Context={ClientsProvider} />}
    >
      <Route path="messages" element={<MessageList />} />
      <Route path="orders" element={<OrderList />} />
      <Route path="orders/:id" element={<SingleOrder />} />
    </Route>
    <Route path="login" element={<Login />} />
    <Route path="imagelist" element={<ImageList />} />
  </>
);

export default AdminRoutes;
