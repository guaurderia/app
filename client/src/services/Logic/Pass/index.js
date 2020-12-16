import { DateTime, Duration } from "luxon";
import { formatDate, activeTime, formatTime } from "../../Format/Time";
import _ from "lodash";
import { api } from "../../../redux/actions";
import { postData } from "../../../redux/actions";

export const getPass = (passes, active) => {
  if (passes?.length) {
    const filteredPasses = passes.filter((pass) => {
      const starts = DateTime.fromISO(pass.starts);
      const expires = DateTime.fromISO(pass.expires);
      const now = DateTime.local();
      if (active) {
        return pass.count > 0 || (expires > now && starts < now);
      } else {
        return pass.count === 0 || expires < now;
      }
    });
    const passesList = filteredPasses.map((pass) => {
      const id = pass._id;
      const name = pass.passType.name;
      const type = pass.passType.type;
      const hours = pass.passType.hours;
      const overTimeRate = pass.passType["overtime-rate"];
      const basic = { id, name, overTimeRate, type, hours };
      if (type === "day") {
        const remainingCount = pass.count;
        const totalCount = pass.passType.duration;
        return {
          ...basic,
          totalCount,
          remainingCount,
        };
      }
      if (type === "month") {
        const starts = pass.starts;
        const expires = pass.expires;
        return {
          ...basic,
          starts,
          expires,
        };
      }
    });
    return passesList;
  }
};

export const isValidPass = (attendance, pass = null) => {
  if (attendance) {
    const timeISO = activeTime(attendance.startTime, attendance.endTime);
    const totalMinutes = Duration.fromISO(timeISO).as("minutes");
    const inTime = totalMinutes - pass.hours * 60 > 0 ? false : true;
    return inTime;
  } else {
    return false;
  }
};

export const createDayPass = async (dog, attendance) => {
  const timeISO = activeTime(attendance.startTime, attendance.endTime);
  const totalHours = Duration.fromISO(timeISO).as("hours");
  const passHours = totalHours < 6 ? 6 : 12;

  const {
    data: [passType],
  } = await api.get(`/passType/show/?type=day&duration=1&hours=${passHours}`);
  const pass = {
    dogChip: dog.chip,
    passType: passType._id,
    purchased: DateTime.local(),
    count: 1,
  };
  return await api.post(`/pass/create`, pass);
};
