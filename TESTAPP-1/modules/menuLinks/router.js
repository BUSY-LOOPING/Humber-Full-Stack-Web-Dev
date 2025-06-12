import express from "express";
const router = express.Router();

//es5: old syntax
// const model = require("./func.js");
import model from "./func.js";

//MENU LINK ADMIN
router.get("/", async (request, response) => {
    let linkList = await model.getLinks();
    response.render("menu-list", {title: "Administer menu links", links: linkList});
    });

//CREATE
//add new link
router.get("/add", async (request, response) => {
    let linkList = await model.getLinks();
    response.render("menu-add", {title: "Add menu link", links: linkList});
});

router.post("/add/submit", async (request, response) => {
    //for a POST form data is passed in the body
    console.log(request.body);
    let newLink = {
        weight:parseInt(request.body.weight),
        name:request.body.name,
        path:request.body.path,
    }
    await model.addLink(newLink);
    response.redirect("/admin/menu");
});


//UPDATE
router.get("/edit", async (request, response) => {
    if (request.query.linkId) {
        let linkToEdit = await model.getSingleLink(request.query.linkId);
        console.log("linkId = " + request.query.linkId);
        let links = await model.getLinks();
        links.forEach(link => {console.log(link.name)});
        response.render("menu-edit", {title: "Edit menu link", links:links, editLink: linkToEdit});
    } else {
        response.render("/admin/menu")
    }
});

router.post("/edit/submit", async (request, response) => {
    let idFilter = {_id: new ObjectId(request.body.linkId)};
    let newLink = {
        weight: parseInt(request.body.weight),
        name: request.body.name,
        path: request.body.path,
    };
    let result = await model.editLink(idFilter, newLink);

    response.redirect("/admin/menu");
});
 
//Delete
router.get("/delete", async (request, response) => {
    //for a get form data is passsed in the query string
    console.log(request.query.linkId);
    await model.deleteLink(request.query.linkId);
    response.redirect("/admin/menu");
});

//es5 : older syntax
// module.exports = router;
export default router;