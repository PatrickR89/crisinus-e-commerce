import "./App.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import AdminRoutes from "./routes/app_admin_routes";
import ClientRoutes from "./routes/app_client_routes";

import { Navbar, Footer, SidebarNav } from "./components/public/elements";
import { CookiesModal } from "./components/public/info";

import { HomePage, AdminPage, ErrorPage } from "./pages";

import { useAuthenticationContext } from "./contexts/authentication_context";

axios.withCredentials = true;
function App() {
  const { handleCookiesModal, cookiesModal, clientEngaged, registerClient } =
    useAuthenticationContext();

  useEffect(() => {
    registerClient();
  }, []);

  if (clientEngaged === false) {
    return (
      <div className="App">
        <h2>Please wait...</h2>
        <Footer />
      </div>
    );
  } else {
    return (
      <div className="App">
        <Navbar />
        <SidebarNav />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          {ClientRoutes}
          <Route path="/admin" element={<AdminPage />}>
            {AdminRoutes}
          </Route>
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
        {cookiesModal && <CookiesModal close={handleCookiesModal} />}
        <Footer />
      </div>
    );
  }
}

export default App;
