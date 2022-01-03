export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  if (type === "authors") {
    unique = unique
      .map((authors) =>
        authors.map((author) => {
          return `${author.name} ${author.last_name}`;
        })
      )
      .flat();
  }
  return ["all", ...new Set(unique)];
};
