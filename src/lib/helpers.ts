export function trimText(input: string, maxLength: number = 100): string {
  if (input.length <= maxLength) return input;
  return input.substring(0, maxLength - 3) + "...";
}
export function getCurrentTimeInSG(): Date {
  // Create a date object with the current UTC time
  const now = new Date();

  // Convert the UTC time to SGT
  const offsetSGT = 8; 
  now.setHours(now.getUTCHours() + offsetSGT);

  return now;
}

export function formatTimeForSG(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // This will format the time in 12-hour format with AM/PM
    timeZone: "Asia/Singapore",
  };

  let formattedTime = new Intl.DateTimeFormat("en-US", options).format(date);

  formattedTime += " SGT";

  return formattedTime;
}

export function formatDate(date: Date): string {
  const formatter = new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  return formatter.format(date);
}
