import { DateTime, Duration } from "luxon";
import { formatDate, activeTime, formatTime } from "../../Format/Time";
import _ from "lodash";
import { api } from "../../../redux/actions";

export const getPass = (passes, active) => {
  if (passes?.length) {
    const filteredPasses = passes.filter((pass) => {
      if (active) {
        return pass.count > 0 || DateTime.fromISO(pass.expires) > DateTime.local();
      } else {
        return pass.count === 0 || DateTime.fromISO(pass.expires) < DateTime.local();
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
        const starts = formatDate(pass.starts);
        const expires = formatDate(pass.expires);
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

export const isValidPass = (attendance, passes = null) => {
  const timeISO = activeTime(attendance.startTime, attendance.endTime);
  const totalMinutes = Duration.fromISO(timeISO).as("minutes");

  if (passes?.length) {
    return passes.filter((pass) => {
      const inTime = totalMinutes - pass.hours * 60 > 0 ? false : true;
      return inTime;
    });
  }
};

export const createDayPass = async (dog, attendance) => {
  const timeISO = activeTime(attendance.startTime, attendance.endTime);
  const totalHours = Duration.fromISO(timeISO).as("hours");
  const passHours = totalHours < 6 ? 6 : 12;

  const {
    data: [passType],
  } = await api.get(`/passType/show/?type=one&hours=${passHours}`);
  const pass = {
    dog: dog._id,
    passType: passType._id,
    purchased: DateTime.local(),
    count: 1,
  };
  return await api.post(`/pass/create`, pass);
};
