import { useState, useEffect } from "react";
import bookPaging from "../utils/bookPaging";
import mockBooks from "../mockData/mockBooks";

export const useFetchBooks = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getBooks = () => {
    setData(bookPaging(mockBooks));
    setLoading(false);
  };

  useEffect(() => {
    getBooks();
  }, []);
  return { loading, data };
};
