export const getUniqueValues = (data, type) => {
  if (!Array.isArray(data)) {
    return ["--"];
  }
  let unique = data.map((item) => item[type]);
  if (type === "authors") {
    unique = unique
      .map((authors) => {
        if (!Array.isArray(authors)) {
          return ``;
        }
        return authors.map((author) => {
          return `${author.name} ${author.last_name}`;
        });
      })
      .flat();
  }
  return ["--", ...new Set(unique)];
};
