import { useState, useEffect } from "react";
import itemsPaging from "../utils/itemsPaging";

export const useFetchItems = (inputData, itemsPerPage) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    getItems();
  }, [inputData, itemsPerPage]);

  const getItems = () => {
    setData(itemsPaging(inputData, itemsPerPage));
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return { loading, setLoading, data };
};
