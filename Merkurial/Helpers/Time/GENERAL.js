const splitDate = (date, splitBy) => {
  let thisDate = date.split(splitBy);
  let year = thisDate[0];
  let month = thisDate[1];
  let day = thisDate[2];
  return [year, month, day];
};

export const getOneMonthPrior = (date, separator) => {
  let [year, month, day] = splitDate(date, separator ? separator : "-");
  month = Number(month);
  month -= 1;
  if (month <= 0) {
    month = 12 + month;
    year -= 1;
  }
  const thisDate = `${year}-${month}-${day}`;
  return thisDate;
};

export const getDayPrior = (date, separator) => {
  let [year, month, day] = splitDate(date, separator ? separator : "-");
  month = Number(month);
  month -= 1;
  if (month <= 0) {
    month = 12 + month;
    year -= 1;
  }
  const thisDate = `${year}-${month}-${day}`;
  return thisDate;
};

export const getFirstOfThisMonth = (date) => {
  const d = date.split("-");
  return `${d[0]}-${d[1]}-01`;
};
