/**
 * функция приводящая форму записи даты к нормальному виду
 */
export const dateTranslate = (date) => {
  const newDate = new Date(date).toLocaleString("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return newDate;
};
