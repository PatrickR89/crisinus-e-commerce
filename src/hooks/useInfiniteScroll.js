import { useState, useEffect, useRef } from "react";
import itemsPaging from "../utils/itemsPaging";
import { useItemsContext } from "../contexts/items_context";

export const useInfiniteScroll = (inputData, itemsPerPage, setPage, page) => {
  const mounted = useRef(false);
  const { screen_width } = useItemsContext();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newData, setNewData] = useState(false);
  const [total, setTotal] = useState([]);

  useEffect(() => {
    getItems();
  }, [inputData, itemsPerPage]);

  const getItems = () => {
    setLoading(true);
    setData(itemsPaging(inputData, itemsPerPage));
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const fillArray = () => {
    setLoading(true);
    if (data.length) {
      setTotal((oldTotal) => {
        if (page === 0) {
          return data[page];
        } else if (total.length < inputData.length) {
          return [...oldTotal, data[page]].flat(1);
        } else {
          return [...oldTotal];
        }
      });
    }
    setTimeout(() => {
      setNewData(false);
    }, 300);
    setLoading(false);
  };

  useEffect(() => {
    fillArray();
  }, [page, data]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!newData) return;
    if (loading) return;
    setPage((oldPage) => oldPage + 1);
  }, [newData]);
  const event = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setNewData(true);
    }
  };

  useEffect(() => {
    if (screen_width < 725 && total.length < inputData.length) {
      window.addEventListener("scroll", event);
    }
    return () => window.removeEventListener("scroll", event);
  }, [screen_width, total, window.innerHeight]);

  return { total, loading };
};
