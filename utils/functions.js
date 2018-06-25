let sortByTime = (events) => {
  return events.sort((a, b) => {
    if (a.startTime < b.startTime) {
      return -1;
    } else if (b.startTime < a.startTime) {
      return 1;
    } else {
      if (a.endTime <= b.endTime) {
        return -1;
      } else {
        return 1;
      }
    }
  })
}

module.exports = {
  sortByTime
}