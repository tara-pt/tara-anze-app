export function formatDateTime(isoString) {
  const dateObj = new Date(isoString);

  const date = dateObj.toLocaleDateString("sl-SI", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const time = dateObj.toLocaleTimeString("sl-SI", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return { date, time };
}
