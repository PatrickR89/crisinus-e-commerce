import { useState, useEffect } from "react";
import itemsPaging from "../utils/itemsPaging";

export const useFetchItems = (inputData, itemsPerPage, setPage) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > data.length - 1) {
        nextPage = 0;
      }
      return nextPage;
    });
  };
  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage < 0) {
        prevPage = data.length - 1;
      }
      return prevPage;
    });
  };

  useEffect(() => {
    getItems();
  }, [inputData, itemsPerPage]);

  const getItems = () => {
    setData(itemsPaging(inputData, itemsPerPage));
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return { loading, setLoading, data, nextPage, prevPage };
};
