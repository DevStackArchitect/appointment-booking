 const formatDate = (date: Date | null): string | null => {
    if (!date) return null;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

const formatDateToDayMonth = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-IN", options);
};
 const formatTimeRange = (startTime: string, endTime: string): string => {
     const extractTime = (dateTime: string) => {
         const match = dateTime.match(/T(\d{2}:\d{2}):/);
         if (match && match[1]) {
             const [hour, minute] = match[1].split(':');
             const hourInt = parseInt(hour, 10);
             const period = hourInt >= 12 ? 'PM' : 'AM';
             const hourFormatted = hourInt % 12 === 0 ? 12 : hourInt % 12;
             return `${hourFormatted}:${minute} ${period}`;
         }
         return '';
     };

     const formattedStartTime = extractTime(startTime);
     const formattedEndTime = extractTime(endTime);

     return `${formattedStartTime} - ${formattedEndTime}`;
 };

export { formatDate, formatDateToDayMonth ,formatTimeRange};
