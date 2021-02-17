const filteredLogs = (logs, month, year, category, activity) => {
  if (category === 'month') {
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
    console.log(activity)
    return logs.filter( log => (
      new Date(log.startTime).getUTCMonth() === month
      && new Date(log.startTime).getUTCFullYear() === year
      && log.activity === activity
    ));
  }

  // FILTER ALL
  if (category === 'all') {
    // FROM ALL ACTIVITIES
    if (activity === 'all') {
      return logs;
    }

    // FILTER BY ACTIVITY
    return logs.filter( log => (
      log.activity === activity
    ));
  }
}

export default filteredLogs;