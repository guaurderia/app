import { DateTime, Duration } from "luxon";
import { formatDate, activeTime } from "../../Format/Time";
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
    console.log("FILTERED PASSES", filteredPasses);
    const passesList = filteredPasses.map((pass) => {
      const name = pass.passType.name;
      const type = pass.passType.type;
      const hours = pass.passType.hours;
      if (type === "day") {
        const remainingCount = pass.count;
        const totalCount = pass.passType.duration;
        return {
          name,
          totalCount,
          remainingCount,
          hours,
          type,
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
        };
      }
      if (type === "one") {
        return {
          name,
          hours,
          type,
        };
      }
    });
    return passesList;
  }
};

export const checkOut = (attendance, pass = null) => {
  if (pass) {
    if (pass?.type === "day") pass.count--;
    const timeISO = activeTime(attendance.startTime, attendance.endTime);
    const totalMinutes = Duration.fromISO(timeISO).as("minutes");
    const overTime = totalMinutes - pass.passType.hours * 60;
    return overTime > 0 ? _.round(minutes * (pass.passType["overtime-rate"] / 60), 2) : 0;
  }
};
