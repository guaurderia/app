import labels from "../../../services/Language/labels.json";
import _ from "lodash";
import { DateTime, Duration } from "luxon";
import { activeTime, formatTime, formatDate } from "../../../services/Time";

export const cardDataFilter = (element) => {
  const table = Object.keys(element).map((key, i) => {
    if (typeof element[key] === "object") {
      Object.keys(element[key]).map((subkey, i) => {});
    }
  });
  return table;
};

const label = (value, language) => {
  const [filter] = labels.filter((l) => l.value === value);
  return filter.label[language];
};

export const dogGeneralDisplay = (dog, language) => {
  return {
    title: "general",
    content: [
      { value: dog.name, label: label("name", language) },
      { value: dog.character.map((e) => e.label[language]).join(", "), label: label("character", language) },
      { value: dog.chip, label: label("chip", language) },
    ],
  };
};

export const dogSexDisplay = (dog, language) => {
  const date = formatDate(dog.heat.date);
  const basic = [
    { value: dog.sex.label.spanish, label: label("gender", language) },
    { value: dog.fixed, label: label("fixed", language) },
  ];
  if (dog.fixed) {
    return { title: "sex", content: basic };
  } else if (dog.heat.had) {
    return { title: "sex", content: [...basic, { value: date, label: label("last_heat", language) }] };
  } else {
    return { title: "sex", content: [...basic, { value: "TODO", label: label("last_heat", language) }] };
  }
};

export const dogMedicalDisplay = (dog, language) => {
  const vaccines = dog.vaccines.map((vac) => vac.label[language]);
  return { title: "medical", content: [{ value: vaccines.join(", "), label: label("vaccines", language) }] };
};

export const dogOwnerDisplay = (dog, language) => {
  const owner = dog.owner;
  return {
    title: "owner",
    content: [
      { value: owner.firstName, label: label("name", language) },
      { value: owner.lastName, label: label("last_name", language) },
      { value: owner.dni, label: label("pid", language) },
      { value: owner.mainPhone, label: label("phone_number", language) },
      { value: owner.username, label: label("email", language) },
    ],
  };
};

export const dogAttendanceDisplay = (attendance, language) => {
  if (attendance.length) {
    const attendanceList = attendance.map((att) => {
      const subtitle = formatDate(att.startTime);
      const startTimeDisplay = formatTime(att.startTime);
      const endTimeDisplay = formatTime(att.endTime);
      const totalTime = activeTime(att.startTime, att.endTime);
      const totalTimeDisplay = Duration.fromISO(totalTime).toFormat("hh:mm");
      return {
        title: subtitle,
        content: [
          { value: startTimeDisplay, label: label("arrival", language) },
          { value: endTimeDisplay, label: label("exit", language) },
          { value: totalTimeDisplay, label: label("time", language) },
        ],
      };
    });
    return { title: "attendance", content: attendanceList };
  } else return [];
};

export const dogPassDisplay = (passes, active, language) => {
  let title;
  if (passes.length) {
    const filteredPasses = passes.filter((pass) => {
      if (active) {
        title = "active passes";
        return pass.count > 0 || DateTime.fromISO(pass.expires) > DateTime.local();
      } else {
        console.log("EXPIRED", DateTime.fromISO(pass.expires) < DateTime.local());
        title = "expired passes";
        return pass.count === 0 || DateTime.fromISO(pass.expires) < DateTime.local();
      }
    });
    console.log("FILTERED PASSES", filteredPasses);
    const passesList = filteredPasses.map((pass) => {
      const subtitle = pass.passType.name;
      const type = pass.passType.type;
      console.log("PASSTYPE", type);
      const hours = pass.passType.hours;
      if (type === "day") {
        const remainingCount = pass.count;
        const totalCount = pass.passType.duration;
        return {
          title: subtitle,
          content: [
            { value: `${remainingCount}/${totalCount}`, label: label("used", language) },
            { value: hours, label: label("hours", language) },
          ],
        };
      }
      if (type === "month") {
        const starts = formatDate(pass.starts);
        const expires = formatDate(pass.expires);
        return {
          title: subtitle,
          content: [
            { value: starts, label: label("starts", language) },
            { value: expires, label: label("expires", language) },
          ],
        };
      }
    });
    return { title, content: passesList };
  }
};
