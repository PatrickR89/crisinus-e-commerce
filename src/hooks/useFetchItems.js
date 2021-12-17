import { useState, useEffect } from "react";
import itemsPaging from "../utils/itemsPaging";

export const useFetchItems = (inputData, itemsPerPage) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getItems = () => {
    setData(itemsPaging(inputData, itemsPerPage));
    setLoading(false);
  };

  useEffect(() => {
    getItems();
    // eslint-disable-next-line
  }, []);
  return { loading, data };
};
