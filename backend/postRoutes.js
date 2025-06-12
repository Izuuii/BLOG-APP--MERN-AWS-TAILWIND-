const express = require('express');
const database = require("./connect")
const ObjectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken');
require("dotenv").config({path: "./config.env"})

let postRoutes = express.Router()

//#1 Retrieve All
postRoutes.route("/posts").get(verifyToken, async(request, response) =>  {
    let db = database.getDb()
    let data = await db.collection("posts").find({}).toArray()
    if(data.length > 0) {
        response.json(data)
    } else {
        response.status(404).json({ error: "Data was not found :" })
    }
})

//#2 Retrieve One
postRoutes.route("/posts/:id").get(verifyToken, async(request, response) =>  {
    let db = database.getDb()
    let data = await db.collection("posts").findOne({_id: new ObjectId(request.params.id)})
    if(data && Object.keys(data).length > 0) {
        response.json(data)
    } else {
        response.status(404).json({ error: "Data was not found :" })
    }
})

//#3 Create One
postRoutes.route("/posts").post(verifyToken, async(request, response) =>  {
    let db = database.getDb()
    let mongoObject = {
        title: request.body.title,
        description: request.body.description,
        content: request.body.content,
        author: request.user._id, // Use user ID from token
        dateCreated: request.body.dateCreated,
    }
    let data = await db.collection("posts").insertOne(mongoObject)
    response.json(data)
})

//#4 Update One
postRoutes.route("/posts/:id").put(verifyToken, async(request, response) =>  {
    let db = database.getDb()
    let mongoObject = {
        $set: {
            title: request.body.title,
            description: request.body.description,
            content: request.body.content,
            author: request.user._id, // Use user ID from token
            dateCreated: request.body.dateCreated,
        }
    }
    let data = await db.collection("posts").updateOne({_id: new ObjectId(request.params.id)}, mongoObject)
    response.json(data)
})

//#5 Delete One
postRoutes.route("/posts/:id").delete(verifyToken, async(request, response) =>  {
    let db = database.getDb()
    let data = await db.collection("posts").deleteOne({_id: new ObjectId(request.params.id)})
    response.json(data)
})

function verifyToken(request, response, next) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return response.status(401).json({ message: "Unauthorized: No token provided" });
    }

    jwt.verify(token, process.env.SECRETKEY, (err, user) => {
        if (err) {
            return response.status(403).json({ message: "Forbidden: Invalid token" });
        }
        request.user = user; // Attach user info to request
        next();
    });
}

module.exports = postRoutes;