import { MongoClient, ObjectId } from "mongodb";


const dbUrl = process.env.ATLAS;  //environment variable
const db = new MongoClient(dbUrl).db('testdb');

//Mongo DB Functions
 
async function getLinks() {
    let linkList = await db.collection("menuLinks").find({}).sort({weight: 1}).toArray();
    return linkList;
}

async function deleteLink(id) {
    //new ObjectId(<exisiting value>) is used to typecase theid to an ObjectId type. This way of using the ObjectId is deprecated. As of now there doesnt seem to be equivalent method without completely creating a new _id so we're using this .
    let deleteFilter = {_id: new ObjectId(id)};
    let result = await db.collection("menuLinks").deleteOne(deleteFilter);
    return result;
}
/**
 * Insert a menu link document
 */
async function addLink(linkDocument) {
    //insert the document into the collection
    let result = await db.collection("menuLinks").insertOne(linkDocument);
    if (result.insertedId) {
        console.log("Inserted document with id: " + result.insertedId);
    }
    return result;
}


async function getSingleLink(id) {
    const editId = { _id: new ObjectId(id)};
    const result = await db.collection("menuLinks").findOne(editId);
    return result;
}

async function editLink(idFilter, newLink) {
    const options = {upsert: false};
    let result = await db.collection("menuLinks").updateOne(idFilter, {$set: newLink}, options);
    if (result.modifiedCount > 0) {
        console.log("Updated document with id: " + idFilter._id);
    } else {
        console.log("No document found with id: " + idFilter._id);
    }
    return result;
}

export default {
    getLinks,
    addLink,
    deleteLink,
    getSingleLink,
    editLink
}