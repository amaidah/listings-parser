const getTime = (ch) => {
  const timeValues = [];
  const timeTableRows = ch('.hours-table').find('tr').toArray();

  timeTableRows.forEach( (row) => {
    const dayTimes = {}
    const day = ch(row).find('th').html();
    dayTimes.day = day.toLowerCase();

    // grab children of td for each day and remove
    // the .extra td ('open now' or 'closed now') field
    const times = ch(row).find('td').not('.extra').children();
    dayTimes.times = [];

    ch(times).each( (i, el) => {
      // filter times by only keeping information from span
      if (el.tagName === 'span') {
        const time = ch(el).html().trim();
        dayTimes.times.push(time);
      }
    })

    timeValues.push(dayTimes);
  })

  console.log(timeValues);

}

export default getTime;
