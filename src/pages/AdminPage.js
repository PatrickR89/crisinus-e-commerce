import React from "react";
import { Outlet } from "react-router-dom";

const AdminPage = () => {
  return (
    <main>
      <h2>admin page!</h2>
      <Outlet />
    </main>
  );
};

export default AdminPage;
