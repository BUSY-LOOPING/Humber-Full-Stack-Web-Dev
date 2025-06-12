import mongoose from "mongoose";

const dbUrl = `${process.env.MONGO_URI}${process.env.DB_NAME}`;

//set up Schema and model
const PetSchema = new mongoose.Schema({
  name: String,
  type: String,
  breed: String,
  age: Number
});
const Pet = mongoose.model("Pet", PetSchema);

await mongoose.connect(dbUrl);

//MONGODB FUNCTIONS
async function connect() {
  await mongoose.connect(dbUrl); //connect to mongodb
}

//Get all pets from the pets collection
async function getPets() {
  return await Pet.find({}); //return array for find all
}


//function to initialize pets with some data
async function initializePets() {
  let pets = [
    {
      name: "Max",
      type: "dog",
      breed: "German Shephard",
      age: 6,
    },
    {
      name: "Fred",
      type: "fish",
      breed: "Koi",
      age: 1,
    }
  ]

  await Pet.insertMany(pets);
}

//function to add a new pet
async function addPet(petName, petType, petBreed, petAge) {
  let newPet = new Pet(
    {
      name: String(petName),
      type: String(petType),
      breed: String(petBreed),
      age: petAge
    }
  );
  let error = newPet.validateSync();
  console.log(error);
  await newPet.save();
}
//function to update pet's name
async function updateName(oldName, newName) {
  await Pet.updateOne(
    {name: oldName},
    {name : newName}
  );
}

//function to delete name 
async function deleteByName(petName) {
  await Pet.deleteOne({ name: petName});
}

export default {
  getPets,
  initializePets,
  addPet,
  updateName,
  deleteByName
}