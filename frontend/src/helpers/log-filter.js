const filteredLogs = (logs, month, year, category, activity) => {
  if (category === 'month') {
    console.log("FILTERING BY MONTH");
    if (logs === null || logs === undefined || logs.length === 0) {
      return logs;
    }

    // FROM ALL ACTIVITIES
    if (activity === 'all') {
      return logs.filter( log => (
        new Date(log.date).getUTCMonth() === month
        && new Date(log.date).getUTCFullYear() === year
      ));
    }

    // FILTER BY ACTIVITY
    return logs.filter( log => (
      new Date(log.date).getUTCMonth() === month
      && new Date(log.date).getUTCFullYear() === year
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