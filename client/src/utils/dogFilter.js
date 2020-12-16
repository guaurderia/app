const filtered = () => {
  const basics = { ..._.pick(selected, ["name", "vaccines", "heat", "sex", "fixed", "chip", "character", "scan"]), breed: _.at(selected, "breed.name"), owner: _.at(selected, "owner.firstName"), creator: _.at(selected, "creator.firstName") };
  return { ...basics };
};
