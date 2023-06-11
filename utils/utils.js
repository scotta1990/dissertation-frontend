export function convertDateToString(dateValue) {
  return new Date(dateValue).toLocaleString();
}

export function convertDurationToString(durationValue) {
  var hours = Math.floor(durationValue / 3600);
  var minutes = Math.floor((durationValue % 3600) / 60);
  var seconds = Math.floor(durationValue % 60);
  return `${hours > 0 ? hours + "h " : ""} ${
    minutes > 0 ? minutes + "m " : ""
  } ${seconds + "s"}`;
}
