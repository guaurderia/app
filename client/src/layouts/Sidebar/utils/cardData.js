import labels from "../../../utils/labels.json";
import _ from "lodash";

export const cardDataFilter = (element) => {
  const table = Object.keys(element).map((key, i) => {
    if (typeof element[key] === "object") {
      Object.keys(element[key]).map((subkey, i) => {});
    }
  });
  return table;
};

const label = (value, language) => labels.map((l) => (l.value === value ? l.label[language] : ""));

export const dogGeneralDisplay = (dog, language) => [
  { value: dog.name, label: label("name", language) },
  { value: dog.character.map((e) => e.label[language]).join(", "), label: label("character", language) },
  { value: dog.chip, label: label("chip", language) },
];

export const dogSexDisplay = (dog, language) => {
  const formatedDate = _.reverse(dog.heat.date.slice(0, 10).split("-")).join("/");
  const basic = [
    { value: dog.sex.label.spanish, label: label("sex", language) },
    { value: dog.fixed, label: label("fixed", language) },
  ];
  if (dog.fixed) {
    return basic;
  } else if (dog.heat.had) {
    return [...basic, { value: formatedDate, label: label("last_heat", language) }];
  } else {
    return [...basic, { value: "TODO", label: label("last_heat", language) }];
  }
};

export const dogMedicalDisplay = (dog, language) => {
  const vaccines = dog.vaccines.map((vac) => vac.label[language]);
  return [{ value: vaccines.join(", "), label: label("vaccines", language) }];
};

export const dogOwnerDisplay = (dog, language) => {
  const owner = dog.owner;
  return [
    { value: owner.firstName, label: label("name", language) },
    { value: owner.lastName, label: label("last_name", language) },
    { value: owner.dni, label: label("pid", language) },
    { value: owner.mainPhone, label: label("phone_number", language) },
    { value: owner.username, label: label("email", language) },
  ];
};
