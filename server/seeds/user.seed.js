const { withDbConnection, dropIfExists } = require("../config/withDbConnection");
const User = require("../models/User.model");
const createSeeds = require("./seed");

const admins = [
  {
    firstName: "Román",
    lastName: "Méndez",
    username: "mendezbeck@dev",
    password: "1234",
    mainPhone: "666888777",
    dni: "55557777G",
    roll: "admin"
  },
  {
    firstName: "Alicia",
    lastName: "Doblas",
    username: "alicia@dev",
    password: "1234",
    mainPhone: "666888777",
    dni: "55557777G",
    roll: "admin"
  }
];

const users = [
  {
    firstName: "Pepe",
    lastName: "Fernandez",
    username: "pepe@dev",
    password: "1234",
    mainPhone: "666888777",
    dni: "55557777G",
    roll: "staff"
  },
  {
    firstName: "Paco",
    lastName: "Fernandez",
    username: "paco@dev",
    password: "1234",
    mainPhone: "666888777",
    dni: "55557777G",
    roll: "staff"
  },
  {
    firstName: "Ana",
    lastName: "Fernandez",
    username: "ana@dev",
    password: "1234",
    mainPhone: "666888777",
    dni: "55557777G",
    roll: "staff"
  },
  {
    firstName: "Marina",
    lastName: "Fernandez",
    username: "marina@dev",
    password: "1234",
    mainPhone: "666888777",
    dni: "55557777G",
    roll: "staff"
  },
  {
    firstName: "Alfonso",
    lastName: "Fernandez",
    username: "alfonso@dev",
    password: "1234",
    mainPhone: "666888777",
    dni: "55557777G",
    roll: "staff"
  }
];

const owners = [
  {
    firstName: "Laura",
    lastName: "Fernandez",
    username: "laura@dev",
    password: "1234",
    mainPhone: "666888777",
    dni: "55557777G",
    roll: "owner"
  },
  {
    firstName: "Felipe",
    lastName: "Fernandez",
    username: "felipe@dev",
    password: "1234",
    mainPhone: "666888777",
    dni: "55557777G",
    roll: "owner"
  },
  {
    firstName: "Clara",
    lastName: "Fernandez",
    username: "clara@dev",
    password: "1234",
    mainPhone: "666888777",
    dni: "55557777G",
    roll: "owner"
  },
  {
    firstName: "Marta",
    lastName: "Fernandez",
    username: "marta@dev",
    password: "1234",
    mainPhone: "666888777",
    dni: "55557777G",
    roll: "owner"
  },
  {
    firstName: "Carla",
    lastName: "Fernandez",
    username: "carla@dev",
    password: "1234",
    mainPhone: "666888777",
    dni: "55557777G",
    roll: "owner"
  }
];

createSeeds(User, [users, admins, owners]);
