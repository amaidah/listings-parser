const convertMilitary = (time) => {
  // match from beginning group of digits
  let hours = +time.match(/^(\d+)/)[1];

  // match a group of digits after ':'
  let min = time.match(/:(\d+)/)[1];
  let meridiem = time.split(' ')[1];

  if (meridiem === 'pm' && hours < 12) {
    hours += 12;
  }

  // check for midnight
  if (meridiem === 'am' && hours === 12) {
    hours += 12;
  }
  hours = hours < 10 ? `0${hours}`: '' + hours;

  return `${hours}${min}`;
}

const convertTime = (timeValues) => {
  const convertedValues = timeValues.map( (day) => {
    const times = day.times.map( (time) => {
      return convertMilitary(time);
    })

    return { day: day.day, times };
  })

  return convertedValues
};

const getTimes = (ch, callback) => {
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

  const convertedTimes = convertTime(timeValues);
  callback(convertedTimes);
}

export default getTimes;
