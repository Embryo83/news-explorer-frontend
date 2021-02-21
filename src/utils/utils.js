function handleDate(date) {
  const dateForm = new Date(date);

  const monthCase = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const year = dateForm.getFullYear();
  const month = dateForm.getMonth();
  const monthCorrection = monthCase[month];
  const days = dateForm.getDate();
  const resultDate = `${days} ${monthCorrection}, ${year}`;
  return resultDate;
}

export {
  handleDate,
};
