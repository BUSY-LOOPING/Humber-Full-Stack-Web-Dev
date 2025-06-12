import "dotenv/config";
import express from "express";
import path from "path";

import db from "./modules/pets/db.js"; //load db.js

const __dirname = import.meta.dirname;

//set up the Express app
const app = express();
const port = process.env.PORT || "8888";

//set up application template engine
app.set("views", path.join(__dirname, "views")); //the first "views" is the setting name
//the second value above is the path: __dirname/views
app.set("view engine", "pug");

//set up folder for static files
app.use(express.static(path.join(__dirname, "public")));

//USE PAGE ROUTES FROM ROUTER(S)
app.get("/", async (request, response) => {
  let petList = await db.getPets();
  //if there's nothing in the pets collection, initialize with some content then get the pets again
  if (!petList.length) {
    await db.initializePets(); 
    petList = await db.getPets();
  } 
  response.render("index", { pets: petList });
});
app.get("/add", async (request, response) => {
  //add a pet
  await db.addPet("Mittens", "cat", "Maine Coon", "three");
  response.redirect("/");
});
app.get("/update", async (request, response) => {
  //update something
  await db.updateName("Fred", "Fred II");
  response.redirect("/");
});
app.get("/delete", async (request, response) => {
  //update something
  await db.deleteByName("Mittens");
  response.redirect("/");
});


//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
}); 

