const filteredLogs = (logs, month, year, category, activity) => {
  console.log(logs);
  if (category === 'month') {
    console.log("FILTERING BY MONTH");
    if (logs === null || logs === undefined || logs.length === 0) {
      return logs;
    }

    // FROM ALL ACTIVITIES
    if (activity === 'all') {
      return logs.filter( log => (
        new Date(log.startTime).getUTCMonth() === month
        && new Date(log.startTime).getUTCFullYear() === year
      ));
    }

    // FILTER BY ACTIVITY
    return logs.filter( log => (
      new Date(log.startTime).getUTCMonth() === month
      && new Date(log.startTime).getUTCFullYear() === year
      && log.activity === activity
    ));
  }

  // FILTER ALL
  if (category === 'all') {
    console.log("FILTERING ALL")
    // FROM ALL ACTIVITIES
    if (activity === 'all') {
      return logs;
    }

    // FILTER BY ACTIVITY
    return logs.filter( log => (
      log.activity === activity
    ));
  }

  console.log("filteredLogs only supports ALL and MONTH");
}

export default filteredLogs;