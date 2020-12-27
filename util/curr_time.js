exports.curr_time = () => {
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
