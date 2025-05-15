//import required modules
import express from "express"; //const express require("express"); olded es5 syntax
//must use type:module is package.json 
import path from "path";

//in the older ES5, there is a special vairable called __dirname to retrieve the absolute path of the current folder. this doesnot exist in ES6 version for node.js

const __dirname = import.meta.dirname;

const app = express(); //create an express application
const port = process.env.PORT || "8888";

//set up expres  app to set the "Views" setting (first argument) to use the views folder for the template files
console.log("path = " +  path.join(__dirname, "views"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug"); //should be the package name for the template engine

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (request, response) => {
    response.render("index", {title: "Home"});
});

app.get("/about", (request, response) => {
    response.render("about", {title: "About"});
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`); //node js is server side console log will log to terminal not the browser console.
})