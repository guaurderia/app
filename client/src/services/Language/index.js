import labels from "./labels.json";

export const translate = (value, language, sex = null) => {
  const [phrase] = labels.filter((l) => l.value === value);
  if (sex) return phrase.label[language][sex];
  else return phrase.label[language];
};
