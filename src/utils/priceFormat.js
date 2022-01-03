const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat("hr-HR", {
    style: "currency",
    currency: "hrk"
  }).format(number / 100);
  return newNumber;
};

export default formatPrice;
