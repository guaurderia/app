import { DateTime } from "luxon";

export const formatTime = (time) => {
  const format = DateTime.fromISO(time).toLocaleString({ hour: "2-digit", minute: "2-digit", hour12: false });
  if (format.includes("Invalid")) return undefined;
  else return format;
};

export const activeTime = (start, end = null) => {
  const startTime = DateTime.fromISO(start);
  const endTime = end ? DateTime.fromISO(end) : DateTime.local();
  return endTime.diff(startTime).toISO();
};

export const formatDate = (date, language) => {
  const format = DateTime.fromISO(date).setLocale(language).toLocaleString(DateTime.DATE_FULL);
  if (format.includes("Invalid")) return undefined;
  else return format;
};
