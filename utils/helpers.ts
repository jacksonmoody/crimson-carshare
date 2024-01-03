export function toStandardTime(militaryTime: any) {
  militaryTime = militaryTime.split(":");
  return militaryTime[0].charAt(0) == 1 && militaryTime[0].charAt(1) > 2
    ? militaryTime[0] - 12 + ":" + militaryTime[1] + " PM"
    : militaryTime.join(":") + " AM";
}

export function convertDate(date: any) {
  return new Date(date).toDateString();
}
