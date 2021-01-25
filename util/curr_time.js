exports.curr_time = () => {
  // Outputs current time YYYY-mm-dd HH:MM:SS
  let now = new Date();
  let time =
    now.getFullYear() +
    "-" +
    now.getMonth() +
    "-" +
    now.getDate() +
    " " +
    now.getHours() +
    ":" +
    now.getMinutes() +
    ":" +
    now.getSeconds();
  return time;
};
