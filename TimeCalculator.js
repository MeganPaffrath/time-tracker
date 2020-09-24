//jshint esversion:6
module.exports.getEndDateFromTime = getEndDateFromTime;

// Generate fake time from total minutes
function getEndDateFromTime(date, totalMinutes) {
  hours = Math.floor(totalMinutes/60);
  let hourStr = "";
  if (hours == 0) {
      hourStr = "00";
  } else if (hours < 10) {
      hourStr = "0" + String(hours);
  } else {
      hourStr = String(hours);
  }

  minutes = totalMinutes%60;
  minutesStr = "";
  if (minutes == 0) {
      minutesStr = "00";
  } else if (minutes < 10) {
      minutesStr = "0" + String(minutes);
  } else {
      minutesStr = String(minutes);
  }

  endDateString = String(date) + "T" + hourStr + ":" + minutesStr + ":00Z";
  const endDate = new Date(endDateString);
  return endDate;
}
