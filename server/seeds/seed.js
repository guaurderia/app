const { withDbConnection, dropIfExists } = require("../config/withDbConnection");
const User = require("../models/User.model");
const Dog = require("../models/Dog.model");
const Pass = require("../models/Pass.model");
const PassType = require("../models/PassType.model");
const dogSeed = require("./dog.seed");
const userSeed = require("./user.seed");
const passTypeSeed = require("./passType.seed");

const createSeeds = async (Model, data) => {
  try {
    if ((await Model.find()).length > 0) await dropIfExists(Model);
    await Model.create(data);
    const created = await Model.find();
    console.log(`${created.length} ${Model.modelName} created`);
  } catch (error) {
    console.log(error);
  }
};

const randomDate = (start, end, startHour, endHour) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const date = new Date(+startDate + Math.random() * (endDate - startDate));
  const hour = (startHour + Math.random() * (endHour - startHour)) | 0;
  date.setHours(hour);
  return date;
};

const createPass = async (dog, passType, creator) => {
  const purchaseDate = randomDate("2020-01-01", "2020-04-01", 8, 20);
  const remaining = () => {
    if (passType.subscription) return { "duration-expires": Date(purchaseDate + passType.duration) };
    else return { "count-remaining": Math.floor(Math.random() * passType.count) };
  };
  return {
    dog: dog._id,
    passType: passType._id,
    "purchase-date": purchaseDate,
    "start-date": purchaseDate,
    ...remaining(),
    creator: creator._id
  };
};

const seedAll = () =>
  withDbConnection(async () => {
    await createSeeds(User, userSeed);
    await createSeeds(Dog, dogSeed);
    await createSeeds(PassType, passTypeSeed);

    const dogs = await Dog.find();
    console.log("DOGS", dogs);
    let passSeed = [];
    for (let dog of dogs) {
      const randomPassType = await PassType.aggregate([{ $sample: { size: 1 } }]);
      const randomUser = await User.aggregate([{ $sample: { size: 1 } }]);
      createPass(dog, ...randomPassType, ...randomUser).then(pass => (passSeed = [...passSeed, pass]));
    }
    console.log("PASS SEED", passSeed);

    await createSeeds(Pass, passSeed);
  });

seedAll();
