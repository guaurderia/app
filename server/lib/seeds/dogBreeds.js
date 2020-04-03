const { withDbConnection, dropIfExists } = require("../../config/withDbConnection");
const Breeds = require("../../models/Breed.model");
const axios = require("axios");

const getBreeds = async () => {
  let data;
  // get information from the temples API
  try {
    const response = await axios.get("https://api.thedogapi.com/v1/breeds");
    data = response.data;
    data = data.map(breed => ({
      name: breed.name,
      temperament: breed.temperament && breed.temperament.split(", "),
      "bred-for": breed["bred_for"] && breed["bred_for"].split(", "),
      "height-cm": breed.height.metric.split(/\D+/),
      "weight-kg": breed.weight.metric.split(/\D+/),
      "life-expentancy": breed["life_span"].split(/\D+/).slice(0, 2),
      wikipedia: breed["wikipedia_url"],
      origin: breed.origin
    }));
    console.log(data);
  } catch (error) {
    console.log(error);
  }
  // create the temples in the data base
  try {
    await withDbConnection(async () => {
      await dropIfExists(Breeds);
      const newBreed = await Breeds.create(data);
      console.log(`${newBreed.length} breeds created`);
    });
  } catch (error) {
    console.log(error);
  }
};

getBreeds();
