// Takes month(0-11) and year, increments month by EITHER 1 or -1
const incrementMonth = (month, year, incrementBy) => {
  if (incrementBy !== 1 && incrementBy !== -1) {
    console.log("You can only change the month to the next or previous month.");
  } else {
    if (incrementBy === -1 ) { // prev month
      if (month === 0) {
        month = 11;
        year = year - 1;
      } else {
        month = month -1;
      }
    } else { // next month
      if (month === 11) {
        month = 0;
        year = year + 1;
      } else {
        month = month + 1;
      }
    }
  }

  return {
    month: month,
    year: year
  }
}

export default incrementMonth;