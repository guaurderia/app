import _ from "lodash";
import { DateTime, Duration } from "luxon";
import { activeTime, formatTime, formatDate } from "../Time";
import { getPass } from "../../Logic/Pass";
import { setLabel } from "../../Language";

export const cardDataFilter = (element) => {
  const table = Object.keys(element).map((key, i) => {
    if (typeof element[key] === "object") {
      Object.keys(element[key]).map((subkey, i) => {});
    }
  });
  return table;
};

export const dogGeneralDisplay = (dog, language) => {
  return {
    title: "general",
    content: [
      { value: dog.name, label: setLabel("name", language) },
      { value: dog.character.map((e) => e.label[language]).join(", "), label: setLabel("character", language) },
      { value: dog.chip, label: setLabel("chip", language) },
    ],
  };
};

export const dogGenderDisplay = (dog, language) => {
  const date = formatDate(dog.heat.date);
  const basic = [
    { value: dog.gender.label.spanish, label: setLabel("gender", language) },
    { value: dog.fixed, label: setLabel("fixed", language) },
  ];
  if (dog.fixed) {
    return { title: "gender", content: basic };
  } else if (dog.heat.had) {
    return { title: "gender", content: [...basic, { value: date, label: setLabel("last_heat", language) }] };
  } else {
    return { title: "gender", content: [...basic, { value: "TODO", label: setLabel("last_heat", language) }] };
  }
};

export const dogMedicalDisplay = (dog, language) => {
  const vaccines = dog.vaccines.map((vac) => vac.label[language]);
  return { title: "medical", content: [{ value: vaccines.join(", "), label: setLabel("vaccines", language) }] };
};

export const dogOwnerDisplay = (dog, language) => {
  const owner = dog.owner;
  return {
    title: "owner",
    content: [
      { value: owner.firstName, label: setLabel("name", language) },
      { value: owner.lastName, label: setLabel("last_name", language) },
      { value: owner.dni, label: setLabel("pid", language) },
      { value: owner.mainPhone, label: setLabel("phone_number", language) },
      { value: owner.username, label: setLabel("email", language) },
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
          { value: startTimeDisplay, label: setLabel("arrival", language) },
          { value: endTimeDisplay, label: setLabel("exit", language) },
          { value: totalTimeDisplay, label: setLabel("time", language) },
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
    if (activePasses) {
      const parsedPassesList = activePasses.map((pass) => {
        if (pass.type === "day") {
          return {
            title: pass.name,
            content: [
              { value: `${pass.remainingCount}/${pass.totalCount}`, label: setLabel("used", language) },
              { value: pass.hours, label: setLabel("hours", language) },
              { value: pass.type, label: setLabel("type", language) },
            ],
          };
        }
        if (pass.type === "month") {
          return {
            title: pass.name,
            content: [
              { value: pass.starts, label: setLabel("starts", language) },
              { value: pass.expires, label: setLabel("expires", language) },
              { value: pass.type, label: setLabel("type", language) },
            ],
          };
        }
        if (pass.type === "one") {
          return {
            title: pass.name,
            content: [
              { value: pass.hours, label: setLabel("hours", language) },
              { value: pass.type, label: setLabel("type", language) },
            ],
          };
        }
      });
      return { title, content: parsedPassesList };
    }
  }
};

export const breedSelector = (breedList) => {
  return breedList.map((breed) => {
    const list = { value: breed, label: breed.name };
    return list;
  });
};
