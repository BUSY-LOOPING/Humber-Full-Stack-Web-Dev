import express from 'express';
const router = express.Router();

import model from '../menuLinks/func.js';

router.get("/", async (request, response) => {
    let linkList = await model.getLinks();
    response.render("index", {title: "Home", links: linkList});
});

router.get("/about", async (request, response) => {
    let linkList = await model.getLinks();
    response.render("about", {title: "About", links: linkList});
});

export default router;