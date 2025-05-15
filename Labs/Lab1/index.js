import express from 'express';
import path from 'path';

const __dirname = import.meta.dirname;

const app = express();
const port = process.env.PORT || '8888';

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (request, response) => {
    response.render("index");
});

app.listen(port, ()=> {
    console.log(`Server stated at http://localhost:${port}`);
});