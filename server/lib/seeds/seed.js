require("mongoose");
const { withDbConnection, dropIfExists } = require("../../config/withDbConnection");
const User = require("../../models/User.model");
const Dog = require("../../models/Dog.model");
const Pass = require("../../models/Pass.model");
const PassType = require("../../models/PassType.model");
const Attendance = require("../../models/Attendance.model");
const Breed = require("../../models/Breed.model");
const passTypeSeed = require("./passType.seed");
const _ = require("lodash");
const faker = require("faker");
const axios = require("axios");

//-----------

// start and end dates from which random attendances are created
const attendanceStart = "2020-04-01";
const attendanceEnd = "2020-05-01";

// start and end dates from which random passes are created
const passStart = "2020-01-01";
const passEnd = "2020-06-01";

// Seeds
const numberOfDogs = 20;
const numberOfUsers = 10;
const numberOfAttendances = 10;

//-----------

const randomDate = (start, end, startHour, endHour) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const date = new Date(+startDate + Math.random() * (endDate - startDate));
  const hour = (startHour + Math.random() * (endHour - startHour)) | 0;
  date.setHours(hour);
  return date;
};

const getBreedList = () => {
  return axios
    .get("https://api.thedogapi.com/v1/breeds")
    .then((res) => {
      const data = res.data.map((breed) => ({
        name: breed.name,
        temperament: breed.temperament && breed.temperament.split(", "),
        "bred-for": breed["bred_for"] && breed["bred_for"].split(", "),
        "height-cm": breed.height.metric.split(/\D+/),
        "weight-kg": breed.weight.metric.split(/\D+/),
        "life-expentancy": breed["life_span"].split(/\D+/).slice(0, 2),
        wikipedia: breed["wikipedia_url"],
        origin: breed.origin,
      }));
      return data;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

// Randomizers

const randomAttendance = (number) => {
  let attendance = [];
  for (let i = 0; i < number; i++) {
    const startHour = _.random(8, 16);
    const timeToClose = 20 - startHour;
    const endHour = startHour + _.random(timeToClose);
    const startDate = randomDate(attendanceStart, attendanceEnd, startHour, startHour);
    const endDate = () => {
      const startCopy = new Date(startDate);
      startCopy.setHours(endHour);
      return startCopy;
    };
    attendance = [...attendance, { startTime: startDate, endTime: endDate() }];
  }
  return attendance;
};

const randomDog = (number) => {
  let dogs = [];
  for (let i = 0; i < number; i++) {
    let switcher1 = i % 2 === 0;
    let switcher4 = i % 5 === 0;
    const name = faker.name.firstName();
    const sex = switcher1 ? "male" : "female";
    const vaccines = { vaccinated: true, list: ["rabies", "parvovirus", "hepatitis", "distemper"] };
    const fixed = switcher4;
    const heat = { had: switcher1, date: faker.date.past() };
    const chip = faker.random.uuid();
    const character = ["shy", "hiperactive", "agressive"];
    const scan = faker.random.number() * 300;
    dogs = [...dogs, { name, sex, vaccines, fixed, heat, chip, character, scan }];
  }
  return dogs;
};

const randomUser = (number) => {
  let users = [];
  const rolls = ["staff", "owner", "owner", "owner", "owner"];
  for (let i = 0; i < number; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const username = faker.internet.email();
    const password = 1234;
    const mainPhone = faker.phone.phoneNumberFormat().split("-").join("").slice(0, 9);
    const dni = faker.phone.phoneNumberFormat().split("-").join("").slice(0, 8) + faker.name.findName().slice(0, 1);
    const roll = rolls[i % 5];
    users = [...users, { firstName, lastName, username, password, mainPhone, dni, roll }];
  }
  const admin = { firstName: "Admin", lastName: "Istrator", username: "admin@dev", password: 1234, mainPhone: 666777888, dni: "55556666Y", roll: "admin" };
  users = [...users, admin];
  return users;
};

// Seed Creators

const createSeeds = async (Model, data) => {
  try {
    if ((await Model.find()).length > 0) await dropIfExists(Model);
    await Model.create(data);
    const created = await Model.find();
    console.log(`${created.length} ${Model.modelName} created: ${created}`);
  } catch (error) {
    console.log(error);
  }
};

const createPass = async (username, passType, creator) => {
  const purchaseDate = randomDate(passStart, passEnd, 8, 20);
  const expiresDate = new Date(purchaseDate);
  const remaining = () => {
    expiresDate.setMonth(expiresDate.getMonth() + passType.duration);
    if (passType.type === "month") return { expires: expiresDate };
    else return { count: Math.floor(Math.random() * passType.duration) };
  };
  return {
    purchasedBy: username,
    passType: passType._id,
    purchased: purchaseDate,
    starts: purchaseDate,
    ...remaining(),
    creator: creator._id,
  };
};

const seedAll = () =>
  withDbConnection(async () => {
    const dogSeed = randomDog(numberOfDogs);
    const userSeed = randomUser(numberOfUsers);
    const attendances = randomAttendance(numberOfAttendances);

    await createSeeds(User, userSeed);
    await createSeeds(Dog, dogSeed);
    await createSeeds(PassType, passTypeSeed);

    const owners = await User.find({ roll: "owner" });
    const staff = await User.find({ roll: "staff" });
    const admins = await User.find({ roll: "admin" });
    const passTypes = await PassType.find();
    const dogs = await Dog.find();
    const breeds = await getBreedList();

    let passSeed = [];
    let attendanceSeed = [];

    for (let dog of dogs) {
      const randomPassType = passTypes[_.random(passTypes.length - 1)];
      const randomStaff = staff[_.random(staff.length - 1)];
      const randomOwner = owners[_.random(owners.length - 1)];
      const randomBreed = breeds[_.random(breeds.length - 1)];
      await Dog.findOneAndUpdate({ _id: dog._id }, { username: randomOwner.username, creator: randomStaff, breed: randomBreed });
      createPass(randomOwner.username, randomPassType, randomStaff).then((pass) => (passSeed = [...passSeed, pass]));
      createPass(randomOwner.username, randomPassType, randomStaff).then((pass) => (passSeed = [...passSeed, pass]));
    }
    for (let s of staff) {
      const randomDog = dogs[_.random(dogs.length - 1)];
      const randomAdmin = admins[_.random(admins.length - 1)];
      await User.findOneAndUpdate({ _id: s._id, roll: "staff" }, { creator: randomAdmin, dogChip: randomDog.chip });
    }
    for (let o of owners) {
      const randomStaff = staff[_.random(staff.length - 1)];
      await User.findOneAndUpdate({ _id: o._id, roll: "owner" }, { creator: randomStaff });
    }
    for (let a of attendances) {
      const randomDog = dogs[_.random(dogs.length - 1)];
      const randomStaff = staff[_.random(staff.length - 1)];
      attendanceSeed = [...attendanceSeed, { dog: randomDog, startTime: a.startTime, endTime: a.endTime, creator: randomStaff }];
    }

    await createSeeds(Pass, passSeed);
    await createSeeds(Attendance, attendanceSeed);
  });

seedAll();
