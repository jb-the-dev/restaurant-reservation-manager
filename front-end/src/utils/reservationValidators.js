// import { today } from "./date-time";

export function businessHoursValidator(timeStr) {
  const timeNum = Number(timeStr.replace(":", ""));
  return (timeNum >= 1030 && timeNum <= 2130);
}

export function futureTimeValidator(dateStr, timeStr) {
  let dateArr = dateStr.split("-");
  let timeArr = timeStr.split(":");
  const todaysDate = new Date();
  let reservationDate = new Date(
    dateArr[0],
    dateArr[1] - 1,
    dateArr[2],
    timeArr[0],
    timeArr[1]
  );

  return reservationDate > todaysDate;
}

export function notTuesdayValidator(dateStr) {
  const dateArr = dateStr.split("-");

  let day = new Date(
    dateArr[0],
    dateArr[1] - 1,
    dateArr[2]
  ).getDay();
  
  return (day === 2);
}