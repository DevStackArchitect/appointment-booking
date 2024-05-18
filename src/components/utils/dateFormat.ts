const formatDate = (date: Date | null): string | null => {
  return date ? date.toISOString().split("T")[0] : null;
};
const formatDateToDayMonth = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};
 const formatTimeRange = (startTime: string, endTime: string): string => {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const formatOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  const formattedStartTime = start.toLocaleTimeString('en-US', formatOptions);
  const formattedEndTime = end.toLocaleTimeString('en-US', formatOptions);

  return `${formattedStartTime} - ${formattedEndTime}`;
};

export { formatDate, formatDateToDayMonth ,formatTimeRange};
