const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const d = date.getDate().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false
    });
    const m = date.getMonth().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false
    });
    const y = date.getFullYear();
    const outputDate = `${d}-${m}-${y}`;
    return outputDate;
};

export default formatDate;
