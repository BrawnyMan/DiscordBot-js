// Turns seconds to human readable time
exports.getTime = (time) => {
  if (!time) return;
  var h = Math.floor(time / 60 / 60);
  var min = Math.floor(time / 60) - h * 60;
  var sec = time % 60;
  return (
    h.toString().padStart(2, "0") +
    ":" +
    min.toString().padStart(2, "0") +
    ":" +
    sec.toString().padStart(2, "0")
  );
};
