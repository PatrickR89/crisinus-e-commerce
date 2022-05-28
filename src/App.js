import "./App.css";
import { Routes, Route } from "react-router-dom";

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
  ImageList
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
  return (
    <div className="App">
      <Navbar />
      <SidebarNav />
      <Routes>
        <Route exact path="/" element={<HomePage />} /> {/* version 1 */}
        <Route path="/about" element={<AboutUsPage />} /> {/* version 1 */}
        <Route path="/books" element={<BooksPage />} /> {/* version 1 */}
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />{" "}
        {/* version 1 */}
        <Route path="/giftshop" element={<GiftshopPage />} /> {/* version 1 */}
        <Route path="/info" element={<InfoPage />} /> {/* version 1 */}
        <Route exact path="/news" element={<NewsPage />} /> {/* version 1 */}
        <Route exact path="/news/:id" element={<NewsExpandedPage />} />
        <Route path="/order" element={<OrderPage />} /> {/* version 1 */}
        <Route path="/payment" element={<PaymentPage />} /> {/* version 1 */}
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/books/:id" element={<SingleBookPage />} />{" "}
        {/* version 1 */}
        <Route path="/giftshop/:id" element={<SingleGiftPage />} />{" "}
        {/* version 1 */}
        <Route path="/authors" element={<AuthorsPage />}>
          <Route path=":author_url" element={<CurrentAuthor />} />{" "}
        </Route>
        {/* version 1 */}
        <Route path="/cart" element={<CartPage />} /> {/* version 1 */}
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
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
