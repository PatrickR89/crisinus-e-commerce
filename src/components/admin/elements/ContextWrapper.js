import React from "react";
import { Outlet } from "react-router-dom";

const ContextWrapper = ({ Context }) => {
  return (
    <Context>
      <Outlet />
    </Context>
  );
};

export default ContextWrapper;
