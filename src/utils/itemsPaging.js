const itemsPaging = (items, itemsPerPage) => {
  const page = Math.ceil(items.length / itemsPerPage);

  const newItems = Array.from({ length: page }, (_, index) => {
    const start = index * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  });
  return newItems;
};

export default itemsPaging;
