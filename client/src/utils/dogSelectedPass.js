const dogSelectedPass = (dog, selectedPassList) => {
  const [pass] = selectedPassList.filter((pass) => pass.dogChip === dog.chip);
  return pass;
};

export default dogSelectedPass;
