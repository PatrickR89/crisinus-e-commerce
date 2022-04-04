import "./App.css";

import { Navbar, Footer, SidebarNav, CurrentAuthor } from "./components";
import {
  AddBook,
  BookList,
  EditBook,
  AuthorsList,
  EditAuthor
} from "./components/admin";
import { Routes, Route } from "react-router-dom";
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
  AdminPage
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
        <Route path="/news" element={<NewsPage />} /> {/* version 1 */}
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
          <Route path="addbook" element={<AddBook />} />
          <Route path="booklist" element={<BookList />} />
          <Route path="authorslist" element={<AuthorsList />} />
          <Route path="editauthor/:id" element={<EditAuthor />} />
          <Route path="editbook/:id" element={<EditBook />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
