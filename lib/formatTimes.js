// refactor to functional
const checkSpillover = (times, callback) => {
  // check if a time range spills past midnight
  for (let i = 0; i < times.length; i++) {
    let length = times[i].times.length;

    if (length > 0) {
      // set interval to 2 to calculate unique pairs
      for (let j = 0; j < times[i].times.length - 1; j += 2) {
        // calculate if end time (j + 1) is smaller than opening time
        let sign = +times[i].times[j + 1] - +times[i].times[j];

        if (sign < 0) {
          // replace post midnight time with midnight
          let temp = times[i].times[j + 1];
          times[i].times[j + 1] = '2400';

          // assemble time range to add to following day
          const range = ['0000', temp];

          // add time range to start of following day
          if (i < 6) {
            times[i + 1].times = range.concat(times[i + 1].times);
          }
          // handle sunday to add to 'next day' of monday aka times[0]
          else {
            times[0].times = range.concat(times[0].times);
          }
        }
      }
    }
  }

  callback(times);
}

const formatTimes = (times, parsed, callback) => {
  checkSpillover(times, (times) => {
    times.forEach( (day) => {
      let base = `${day.day}_hours`;
      let length = day.times.length;

      if (length > 0 && length % 2 === 0) {
        let slot = 0;

        // loop 6 times to account for 3 open/close slots
        for (let i = 0; i < 6; i++) {
          let modifier = 'end';
          let value = day.times[i] != null ? day.times[i] : null;

          if (i % 2 === 0) {
            modifier = 'start';
            slot++;
          }

          let text = `${base}_${modifier}_${slot}`;
          parsed[text] = value;
        }
      }
    })

  callback(parsed);
  })
}

export default formatTimes;
