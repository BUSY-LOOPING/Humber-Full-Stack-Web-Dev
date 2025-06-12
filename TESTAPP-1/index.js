import "dotenv/config"; //es6 syntax to loada env file and make the loaded variables available throughout the app
import dotenv from "dotenv";
dotenv.config();

//import required modules
import express, { response } from "express"; //const express require("express"); olded es5 syntax
//must use type:module is package.json 
import path from "path";
import adminPageRouter from "./modules/menuLinks/router.js"; //import the router module
import pageRouter from "./modules/pages/router.js"; //import the router module

console.log(process.env.DBURL);
//in the older ES5, there is a special vairable called __dirname to retrieve the absolute path of the current folder. this doesnot exist in ES6 version for node.js

const __dirname = import.meta.dirname;

const app = express(); //create an express application
const port = process.env.PORT || "8888"; 

//setup express app to make POST request data available through request.body
app.use(express.urlencoded({extended: true})); //for parsing application/x-www-form-urlencoded
app.use(express.json()); //for parsing application/json

//set up expres  app to set the "Views" setting (first argument) to use the views folder for the template files
console.log("path = " +  path.join(__dirname, "views"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug"); //should be the package name for the template engine

app.use(express.static(path.join(__dirname, "public")));

app.use('/admin/menu', adminPageRouter);
app.use("/", pageRouter); //use the router module for all requests starting with "/"

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`); //node js is server side console log will log to terminal not the browser console.
})
