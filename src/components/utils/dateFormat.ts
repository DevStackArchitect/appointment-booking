const formatDate = (date: string | null): string | null => {
    if (!date) return null;
    return date.split('T')[0];  // Splits the string at 'T' and returns the first part
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
