import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  AboutUsPage,
  BooksPage,
  ContactPage,
  DisclaimerPage,
  GiftshopPage,
  InfoPage,
  LibrariesPage,
  NewsPage,
  OrderPage,
  PaymentPage,
  ReviewsPage,
  SingleBookPage,
  SingleGiftPage
} from "./pages";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} /> {/* version 1 */}
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/books" element={<BooksPage />} /> {/* version 1 */}
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="/giftshop" element={<GiftshopPage />} /> {/* version 1 */}
        <Route path="/info" element={<InfoPage />} />
        <Route path="/libraries" element={<LibrariesPage />} />
        <Route path="/news" element={<NewsPage />} /> {/* version 1 */}
        <Route path="/order" element={<OrderPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/books/:id" element={<SingleBookPage />} />{" "}
        {/* version 1 */}
        <Route path="/giftshop/:id" element={<SingleGiftPage />} />{" "}
        {/* version 1 */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
