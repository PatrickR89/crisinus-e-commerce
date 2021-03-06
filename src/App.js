import "./App.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import { CurrentAuthor } from "./components/public/authors";
import { Navbar, Footer, SidebarNav } from "./components/public/elements";
import {
    EditInfo,
    ListInfo,
    ImageList,
    ListLinks,
    EditLinks
} from "./components/admin/info";
import { AddBook, BookList, EditBook } from "./components/admin/books";
import { GiftshopList, EditGift, AddGift } from "./components/admin/giftshop";
import { AuthorsList, EditAuthor } from "./components/admin/authors";
import { AddNews, EditNews, ListNews } from "./components/admin/news";
import { AddRating, EditRating, ListRatings } from "./components/admin/ratings";
import { OrderList, SingleOrder } from "./components/admin/orders/";

import Login from "./components/authentication/Login";

import { HomePage, AdminPage, ErrorPage } from "./pages";

import {
    BooksPage,
    GiftshopPage,
    SingleBookPage,
    SingleGiftPage
} from "./pages/products";

import {
    AboutUsPage,
    DisclaimerPage,
    InfoPage,
    OrderPage,
    PaymentPage,
    ContactPage
} from "./pages/information";

import {
    NewsPage,
    ReviewsPage,
    AuthorsPage,
    CartPage,
    NewsExpandedPage
} from "./pages/product_related";

import { useAuthenticationContext } from "./contexts/authentication_context";

function App() {
    const { clientHeader } = useAuthenticationContext();
    axios.withCredentials = true;

    useEffect(() => {
        axios.defaults.headers.common["client-access-token"] = clientHeader();
    }, []);

    return (
        <div className="App">
            <Navbar />
            <SidebarNav />
            <Routes>
                <Route exact path="/" element={<HomePage />} />{" "}
                <Route path="/about" element={<AboutUsPage />} />{" "}
                <Route path="/books" element={<BooksPage />} />{" "}
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/disclaimer" element={<DisclaimerPage />} />{" "}
                <Route path="/giftshop" element={<GiftshopPage />} />{" "}
                <Route path="/info" element={<InfoPage />} />
                <Route exact path="/news" element={<NewsPage />} />{" "}
                <Route exact path="/news/:id" element={<NewsExpandedPage />} />
                <Route path="/order" element={<OrderPage />} />{" "}
                <Route path="/payment" element={<PaymentPage />} />{" "}
                <Route path="/reviews" element={<ReviewsPage />} />
                <Route path="/books/:id" element={<SingleBookPage />} />{" "}
                <Route path="/giftshop/:id" element={<SingleGiftPage />} />{" "}
                <Route path="/authors" element={<AuthorsPage />}>
                    <Route path=":id" element={<CurrentAuthor />} />{" "}
                </Route>
                <Route path="/cart" element={<CartPage />} />
                <Route path="/admin" element={<AdminPage />}>
                    <Route path="login" element={<Login />} />
                    <Route path="addbook" element={<AddBook />} />
                    <Route path="booklist" element={<BookList />} />
                    <Route path="editbook/:id" element={<EditBook />} />
                    <Route path="authorslist" element={<AuthorsList />} />
                    <Route path="editauthor/:id" element={<EditAuthor />} />
                    <Route path="addgift" element={<AddGift />} />
                    <Route path="editgift/:id" element={<EditGift />} />
                    <Route path="giftshoplist" element={<GiftshopList />} />
                    <Route path="addrating" element={<AddRating />} />
                    <Route path="editrating/:id" element={<EditRating />} />
                    <Route path="ratingslist" element={<ListRatings />} />
                    <Route path="addnews" element={<AddNews />} />
                    <Route path="editnews/:id" element={<EditNews />} />
                    <Route path="newslist" element={<ListNews />} />
                    <Route path="editinfo/:id" element={<EditInfo />} />
                    <Route path="infolist" element={<ListInfo />} />
                    <Route path="imagelist" element={<ImageList />} />
                    <Route path="linkslist" element={<ListLinks />} />
                    <Route path="editlink/:id" element={<EditLinks />} />
                    <Route path="orderslist" element={<OrderList />} />
                    <Route path="orderlist/:id" element={<SingleOrder />} />
                </Route>
                <Route path="/*" element={<ErrorPage />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
