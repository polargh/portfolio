export const USTimeFormatter = new Intl.DateTimeFormat(undefined, {
  timeZone: "America/Chicago",
  hour: "numeric",
  minute: "numeric",
  hour12: false,
});

const relativeTimeFormatter = new Intl.RelativeTimeFormat("en", {
  style: "long",
});

export const discordId = "645045981238394902";
export const dob = new Date("2006-12-15");
export const age = new Date(Date.now() - dob.getTime()).getFullYear() - 1970;
export const hasHadBirthdayThisYear =
  new Date().getMonth() >= dob.getMonth() &&
  new Date().getDate() >= dob.getDate();
export const nextBirthdayYear =
  new Date().getFullYear() + (hasHadBirthdayThisYear ? 1 : 0);
export const daysUntilBirthday = relativeTimeFormatter.formatToParts(
  Math.floor(
    (new Date(nextBirthdayYear, dob.getMonth(), dob.getDay() + 1).getTime() -
      Date.now()) /
      1000 /
      60 /
      60 /
      24
  ),
  "day"
)[1]!.value.toString();
