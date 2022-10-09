import {
  businessHoursValidator,
  futureTimeValidator,
  notTuesdayValidator,
} from "./_validatorHelpers";

export default async function reservationValidator(
  date,
  time,
  setFutureTimeError,
  setBusinessHoursError,
  setTuesdayError
) {
  let isFutureTime = await futureTimeValidator(date, time);
  let isDuringBusinessHours = await businessHoursValidator(time);
  let isTuesday = await notTuesdayValidator(date);

  if (!isFutureTime) {
    setFutureTimeError(
      new Error("Sorry, the reservation date and time must be in the future.")
    );
  } else setFutureTimeError(null);

  if (!isDuringBusinessHours) {
    setBusinessHoursError(
      new Error(
        "Sorry, reservations can only be made between the hours of 10:30am to 9:30pm."
      )
    );
  } else setBusinessHoursError(null);

  if (isTuesday) {
    setTuesdayError(
      new Error(
        "Sorry, no reservations can be made on Tuesdays. The restaurant is closed."
      )
    );
  } else setTuesdayError(null);

  return isFutureTime && isDuringBusinessHours && !isTuesday;
}
