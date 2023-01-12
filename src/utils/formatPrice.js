const formatPrice = (number) => {
  const inEur = number / 100;
  const newNumber = Intl.NumberFormat("eu-EU", {
    style: "currency",
    currency: "eur"
  }).format(inEur);
  return newNumber;
};

export default formatPrice;
