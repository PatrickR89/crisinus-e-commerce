import "./App.css";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import { Navbar, Footer, SidebarNav, CurrentAuthor } from "./components";
import {
    AddBook,
    BookList,
    EditBook,
    AuthorsList,
    EditAuthor,
    GiftshopList,
    EditGift,
    AddGift,
    AddRating,
    EditRating,
    ListRatings,
    AddNews,
    EditNews,
    ListNews,
    EditInfo,
    ListInfo,
    ImageList,
    ListLinks,
    EditLinks
} from "./components/admin";

import Login from "./components/authentication/Login";

import {
    HomePage,
    AboutUsPage,
    BooksPage,
    ContactPage,
    DisclaimerPage,
    GiftshopPage,
    InfoPage,
    NewsPage,
    OrderPage,
    PaymentPage,
    ReviewsPage,
    SingleBookPage,
    SingleGiftPage,
    AuthorsPage,
    CartPage,
    AdminPage,
    NewsExpandedPage
} from "./pages";

function App() {
    axios.withCredentials = true;
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
                    <Route path=":author_url" element={<CurrentAuthor />} />{" "}
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
                </Route>
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
