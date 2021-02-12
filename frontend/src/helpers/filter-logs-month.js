const filteredLogs = (logs, month, year, category) => {
  if (logs.length === 0) {
    return logs;
  }

  // FROM ALL
  if (category === 'all') {
    return logs.filter( log => (
      new Date(log.date).getUTCMonth() === month
      && new Date(log.date).getUTCFullYear() === year
    ));
  }

  // FILTER BY CATEGORY
  return logs.filter( log => (
    new Date(log.date).getUTCMonth() === month
    && new Date(log.date).getUTCFullYear() === year
    && log.activity === category
  ));

}

export default filteredLogs;