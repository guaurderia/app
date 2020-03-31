const { withDbConnection, dropIfExists } = require("../config/withDbConnection");
const User = require("../models/User.model");

const admins = [
  {
    firstName: "Román",
    lastName: "Méndez",
    username: "mendezbeck@gmail.com",
    password: "1234",
    roll: "admin"
  },
  {
    firstName: "Alicia",
    lastName: "Doblas",
    username: "aliciadoblas@gmail.com",
    password: "1234",
    roll: "admin"
  }
];

const users = [
  {
    firstName: "Pepe",
    lastName: "Rodriguez",
    username: "pepe@gmail.com",
    password: "1234",
    roll: "user"
  },
  {
    firstName: "Pablo",
    lastName: "Rodriguez",
    username: "pablo@gmail.com",
    password: "1234",
    roll: "user"
  },
  {
    firstName: "Ana",
    lastName: "Rodriguez",
    username: "ana@gmail.com",
    password: "1234",
    roll: "user"
  },
  {
    firstName: "Sara",
    lastName: "Rodriguez",
    username: "sara@gmail.com",
    password: "1234",
    roll: "user"
  },
  {
    firstName: "Manuel",
    lastName: "Rodriguez",
    username: "manuel@gmail.com",
    password: "1234",
    roll: "user"
  }
];

const owners = [
  {
    firstName: "Pepe",
    lastName: "Rodriguez",
    username: "pepe@gmail.com",
    password: "1234",
    roll: "owner"
  },
  {
    firstName: "Pablo",
    lastName: "Rodriguez",
    username: "pablo@gmail.com",
    password: "1234",
    roll: "owner"
  },
  {
    firstName: "Ana",
    lastName: "Rodriguez",
    username: "ana@gmail.com",
    password: "1234",
    roll: "owner"
  },
  {
    firstName: "Sara",
    lastName: "Rodriguez",
    username: "sara@gmail.com",
    password: "1234",
    roll: "owner"
  },
  {
    firstName: "Manuel",
    lastName: "Rodriguez",
    username: "manuel@gmail.com",
    password: "1234",
    roll: "owner"
  }
];

const createUsers = async data => {
  try {
    await withDbConnection(async () => {
      if ((await User.find()).length > 0) await dropIfExists(User);
      for (let list of data) {
        await User.create(list);
      }
      const created = await User.find();
      console.log(`${created.length} users created`);
    });
  } catch (error) {
    console.log(error);
  }
};

createUsers([users, admins, owners]);
