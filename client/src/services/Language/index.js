import labels from "./labels.json";

export const setLabel = (value, language) => {
  const [filter] = labels.filter((l) => l.value === value);
  return filter.label[language];
};
