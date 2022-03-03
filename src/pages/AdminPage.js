import React from "react";
import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";

const AdminPage = () => {
  return (
    <main>
      <Wrapper>
        <h2>admin page!</h2>
        <Link className="btn mg-1" to="/admin/addbook">
          Add new book
        </Link>
        <Link className="btn mg-1" to="/admin/booklist">
          List of books
        </Link>
        <Link className="btn mg-1" to="/admin/authorslist">
          List of authors
        </Link>
        <Outlet />
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  .mg-1 {
    margin: 1rem;
  }
`;

export default AdminPage;
