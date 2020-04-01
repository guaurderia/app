const { withDbConnection, dropIfExists } = require("../config/withDbConnection");
const Dog = require("../models/Dog.model");
const createSeeds = require("./seed");

const data = [
  {
    name: "Leo",
    breed: "mix",
    sex: "female",
    vaccines: { rabies: true, parvovirus: true, hepatitis: true, distemper: true },
    fixed: true,
    heat: { had: false },
    chip: "HWIUDHAA80019UX",
    character: "shy",
    scan: "9998183779291772"
  },
  {
    name: "Pepa",
    breed: "mix",
    sex: "female",
    vaccines: { rabies: true, parvovirus: true, hepatitis: true, distemper: true },
    fixed: true,
    heat: { had: false },
    chip: "HWIUDHAA80019UC",
    character: "shy",
    scan: "9998183779291772"
  },
  {
    name: "Dogo",
    breed: "mix",
    sex: "male",
    vaccines: { rabies: true, parvovirus: true, hepatitis: true, distemper: true },
    fixed: true,
    heat: { had: false },
    chip: "HWIUDHAA80019UE",
    character: "shy",
    scan: "9998183779291772"
  },
  {
    name: "Kika",
    breed: "mix",
    sex: "female",
    vaccines: { rabies: true, parvovirus: true, hepatitis: true, distemper: true },
    fixed: true,
    heat: { had: false },
    chip: "HWIUDHAA80019UF",
    character: "shy",
    scan: "9998183779291772"
  },
  {
    name: "Bruce",
    breed: "mix",
    sex: "female",
    vaccines: { rabies: true, parvovirus: true, hepatitis: true, distemper: true },
    fixed: true,
    heat: { had: false },
    chip: "HWIUDHAA80019UG",
    character: "shy",
    scan: "9998183779291772"
  }
];

createSeeds(Dog, data);
