import _ from "lodash";
import { DateTime, Duration } from "luxon";
import { activeTime, formatTime, formatDate } from "../Time";
import { getPass } from "../../Logic/Pass";
import { translate } from "../../Language";

export const cardDataFilter = (element) => {
  const table = Object.keys(element).map((key, i) => {
    if (typeof element[key] === "object") {
      Object.keys(element[key]).map((subkey, i) => {});
    }
  });
  return table;
};

export const dogGeneralDisplay = (dog, language) => {
  const character = dog.character;
  console.log("CHARACTER", character);
  const localCharacter = character[0] ? character.map((trait) => translate(trait, language, dog.sex)) : null;

  return {
    title: "general",
    content: [
      { value: dog.name, label: translate("name", language) },
      { value: localCharacter?.join(", "), label: translate("character", language) },
      { value: dog.chip, label: translate("chip", language) },
    ],
  };
};

export const dogSexDisplay = (dog, language) => {
  const date = formatDate(dog.heat?.date);
  const basic = [
    { value: translate(dog.sex, language), label: translate("sex", language) },
    { value: dog.fixed, label: translate("fixed", language, dog.sex) },
  ];
  if (dog.fixed) {
    return { title: "sex", content: basic };
  } else if (dog.heat.had) {
    return { title: "sex", content: [...basic, { value: date, label: translate("last_heat", language) }] };
  } else {
    return { title: "sex", content: [...basic, { value: "TODO", label: translate("last_heat", language) }] };
  }
};

export const dogMedicalDisplay = (dog, language) => {
  const vaccineList = dog.vaccines?.list?.map((vac) => translate(vac, language));
  if (vaccineList) {
    return { title: "medical", content: [{ value: vaccineList.join(", "), label: translate("vaccines", language) }] };
  } else {
    return { title: "medical", content: [{ value: dog.vaccines.vaccinated, label: translate("vaccinated", language, dog.sex) }] };
  }
};

export const dogOwnerDisplay = (dog, language) => {
  const owner = dog.owner;
  if (owner) {
    return {
      title: "owner",
      content: [
        { value: owner.firstName, label: translate("name", language) },
        { value: owner.lastName, label: translate("last_name", language) },
        { value: owner.dni, label: translate("pid", language) },
        { value: owner.mainPhone, label: translate("phone_number", language) },
        { value: owner.username, label: translate("email", language) },
      ],
    };
  }
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
          { value: startTimeDisplay, label: translate("arrival", language) },
          { value: endTimeDisplay, label: translate("exit", language) },
          { value: totalTimeDisplay, label: translate("time", language) },
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
              { value: `${pass.remainingCount}/${pass.totalCount}`, label: translate("used", language) },
              { value: pass.hours, label: translate("hours", language) },
              { value: pass.type, label: translate("type", language) },
            ],
          };
        }
        if (pass.type === "month") {
          return {
            title: pass.name,
            content: [
              { value: pass.starts, label: translate("starts", language) },
              { value: pass.expires, label: translate("expires", language) },
              { value: pass.type, label: translate("type", language) },
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
    const list = { value: [breed, breed.id], label: breed.name };
    return list;
  });
};
