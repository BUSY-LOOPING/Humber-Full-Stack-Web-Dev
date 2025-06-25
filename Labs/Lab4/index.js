import express from "express";
import path from "path";
import moviesRouter from "./components/Movie/routes.js";
import { connect } from "./db.js";
 
connect();

const __dirname = import.meta.dirname;

const app = express();
const port = process.env.PORT || "8888";

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "pug");

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", moviesRouter);

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});