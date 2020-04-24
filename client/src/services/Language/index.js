import labels from "./labels.json";

export const translate = (value, language, gender = null) => {
  const [phrase] = labels.filter((l) => l.value === value);
  if (gender) return phrase.label[language][gender];
  else return phrase.label[language];
};
