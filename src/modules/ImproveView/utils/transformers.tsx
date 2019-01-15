export const getFormattedDate = (timestamp: number) => {
  const now = new Date(timestamp * 1000);

  // Create an array with the current month, day and time
  const date = [now.getDate(), now.getMonth() + 1, now.getFullYear()].map(d =>
    d.toString().length === 1 ? "0" + d : d,
  );

  // Create an array with the current hour, minute and second
  const time = [now.getHours(), now.getMinutes(), now.getSeconds()].map(d =>
    d.toString().length === 1 ? "0" + d : d,
  );

  return date.join("/") + " " + time.join(":");
};
