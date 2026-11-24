const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split("-").map(Number);

  const date = new Date(0);
  date.setFullYear(year, month - 1, day);

  return dateFormatter.format(date);
}
