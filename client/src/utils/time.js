import dayjs from 'dayjs';

// This will base on the current time
export function getRemainingTimeUntilMsTimestamp(timestampMs) {
  const timestampDayjs = dayjs(timestampMs);
  const nowDayjs = dayjs();
  if (timestampDayjs.isBefore(nowDayjs)) {
    return {
      seconds: '00',
      minutes: '00',
      hours: '00',
    };
  }
  return {
    seconds: getRemainingSeconds(nowDayjs, timestampDayjs),
    minutes: getRemainingMinutes(nowDayjs, timestampDayjs),
    hours: getRemainingHours(nowDayjs, timestampDayjs),
  };
}

// This will only base on the passed time
export function getRemainingTimeStringNoDiff(timestampMs) {
  const timeString = new Date(timestampMs).toISOString().slice(11, 19);

  return {
    seconds: timeString.slice(-2),
    minutes: timeString.slice(3, 5),
    hours: timeString.slice(0, 2),
  };
}

export const getDateLeftInCurrentMonth = () => {
  const today = new Date();
  const firstDayNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  const lastDayCurrentMonth = new Date(firstDayNextMonth - 1);
  const daysLeft = lastDayCurrentMonth.getDate() - today.getDate();
  return daysLeft
}

export function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getRemainingSeconds(nowDayjs, timestampDayjs) {
  const seconds = timestampDayjs.diff(nowDayjs, 'seconds') % 60;
  return padWithZeros(seconds, 2);
}

function getRemainingMinutes(nowDayjs, timestampDayjs) {
  const minutes = timestampDayjs.diff(nowDayjs, 'minutes') % 60;
  return padWithZeros(minutes, 2);
}

function getRemainingHours(nowDayjs, timestampDayjs) {
  const hours = timestampDayjs.diff(nowDayjs, 'hours') % 24;
  return padWithZeros(hours, 2);
}

export function padWithZeros(number, minLength) {
  const numberString = number.toString();
  if (numberString.length >= minLength) return numberString;
  return '0'.repeat(minLength - numberString.length) + numberString;
}
