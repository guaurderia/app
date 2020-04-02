const { withDbConnection, dropIfExists } = require("../../config/withDbConnection");
const User = require("../../models/User.model");
const Dog = require("../../models/Dog.model");
const Pass = require("../../models/Pass.model");
const PassType = require("../../models/PassType.model");
const dogSeed = require("./dog.seed");
const userSeed = require("./user.seed");
const passTypeSeed = require("./passType.seed");
const _ = require("lodash");

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
  const expiresDate = new Date(purchaseDate.getTime());
  const remaining = () => {
    if (passType.type === "month") return { expires: expiresDate.setMonth(expiresDate.getMonth() + passType.duration) };
    else return { count: Math.floor(Math.random() * passType.duration) };
  };
  return {
    dog: dog._id,
    passType: passType._id,
    purchased: purchaseDate,
    starts: purchaseDate,
    ...remaining(),
    creator: creator._id
  };
};

const randomAttendance = () => {
  const startTime = randomDate("2020-01-01", "2020-04-01", 8, 16);
  const endTime = new Date(startTime.getTime());
};

const seedAll = () =>
  withDbConnection(async () => {
    await createSeeds(User, userSeed);
    await createSeeds(Dog, dogSeed);
    await createSeeds(PassType, passTypeSeed);

    const owners = await User.find({ roll: "owner" });
    const staff = await User.find({ roll: "staff" });
    const admins = await User.find({ roll: "admin" });
    const passTypes = await PassType.find();
    const dogs = await Dog.find();

    let passSeed = [];
    for (let dog of dogs) {
      const randomPassType = passTypes[_.random(passTypes.length - 1)];
      const randomStaff = staff[_.random(staff.length - 1)];
      const randomOwner = owners[_.random(owners.length - 1)];
      await Dog.findOneAndUpdate({ _id: dog._id }, { owner: randomOwner, creator: randomStaff });
      createPass(dog, randomPassType, randomStaff).then(pass => (passSeed = [...passSeed, pass]));
    }
    for (let s of staff) {
      const randomAdmin = admins[_.random(admins.length - 1)];
      await User.findOneAndUpdate({ _id: s._id, roll: "staff" }, { creator: randomAdmin });
    }
    for (let o of owners) {
      const randomStaff = staff[_.random(staff.length - 1)];
      await User.findOneAndUpdate({ _id: o._id, roll: "owner" }, { creator: randomStaff });
    }

    await createSeeds(Pass, passSeed);
  });

seedAll();
Pass.find()
  .populate("passType")
  .then(e => console.log(e));
