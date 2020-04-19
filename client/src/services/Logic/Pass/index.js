import { DateTime, Duration } from "luxon";
import { formatDate, activeTime, formatTime } from "../../Format/Time";
import _ from "lodash";

export const getPass = (passes, active) => {
  if (passes?.length) {
    const filteredPasses = passes.filter((pass) => {
      if (active) {
        return pass.count > 0 || DateTime.fromISO(pass.expires) > DateTime.local();
      } else {
        return pass.count === 0 || DateTime.fromISO(pass.expires) < DateTime.local();
      }
    });
    console.log("PASSES IN GET PASS", passes, filteredPasses);
    const passesList = filteredPasses.map((pass) => {
      const name = pass.passType.name;
      const type = pass.passType.type;
      const hours = pass.passType.hours;
      const overTimeRate = pass.passType["overtime-rate"];
      if (type === "day") {
        const remainingCount = pass.count;
        const totalCount = pass.passType.duration;
        return {
          name,
          totalCount,
          remainingCount,
          hours,
          type,
          overTimeRate,
        };
      }
      if (type === "month") {
        const starts = formatDate(pass.starts);
        const expires = formatDate(pass.expires);
        return {
          name,
          starts,
          expires,
          hours,
          type,
          overTimeRate,
        };
      }
      if (type === "one") {
        return {
          name,
          hours,
          type,
          overTimeRate,
        };
      }
    });
    return passesList;
  }
};

export const checkOut = (attendance, pass = null) => {
  const timeISO = activeTime(attendance.startTime, attendance.endTime);
  const totalMinutes = Duration.fromISO(timeISO).as("minutes");

  if (pass) {
    if (pass?.type === "day") pass.count--;
    const overTime = totalMinutes - pass.hours * 60;
    const overtTimeFormat = formatTime(overTime * 60 * 1000, "fromMillis");
    const owed = overTime > 0 ? _.round(overTime * (pass.overTimeRate / 60), 2) : 0;
    return { amount: owed, time: overtTimeFormat };
  }
};
