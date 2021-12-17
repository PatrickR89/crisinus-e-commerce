const booksPaging = (books) => {
  const itemsPerPage = 8;
  const page = Math.ceil(books.length / itemsPerPage);

  const newBooks = Array.from({ length: page }, (_, index) => {
    const start = index * itemsPerPage;
    return books.slice(start, start + itemsPerPage);
  });
  return newBooks;
};

export default booksPaging;
