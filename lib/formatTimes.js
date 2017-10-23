const formatTimes = (times, parsed, callback) => {
  console.log(parsed);

  times.forEach( (day) => {
    console.log(day);
  })

  callback(times);
}

export default formatTimes;
