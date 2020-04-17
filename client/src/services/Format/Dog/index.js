import labels from "../../Language/labels.json";
import _ from "lodash";
import { DateTime, Duration } from "luxon";
import { activeTime, formatTime, formatDate } from "../Time";
import { getPass } from "../../Logic/Pass";

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
  const title = active ? "active passes" : "expired passes";
  if (passes) {
    const activePasses = getPass(passes, active);
    console.log("PASSES LIST", activePasses, "PASSES", passes);
    if (activePasses) {
      const parsedPassesList = activePasses.map((pass) => {
        if (pass.type === "day") {
          return {
            title: pass.name,
            content: [
              { value: `${pass.remainingCount}/${pass.totalCount}`, label: label("used", language) },
              { value: pass.hours, label: label("hours", language) },
              { value: pass.type, label: label("type", language) },
            ],
          };
        }
        if (pass.type === "month") {
          return {
            title: pass.name,
            content: [
              { value: pass.starts, label: label("starts", language) },
              { value: pass.expires, label: label("expires", language) },
              { value: pass.type, label: label("type", language) },
            ],
          };
        }
        if (pass.type === "one") {
          return {
            title: pass.name,
            content: [
              { value: pass.hours, label: label("hours", language) },
              { value: pass.type, label: label("type", language) },
            ],
          };
        }
      });
      return { title, content: parsedPassesList };
    }
  }
};
