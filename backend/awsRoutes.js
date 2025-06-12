const express = require('express');
const database = require("./connect")
const ObjectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken');
require("dotenv").config({path: "./config.env"})

const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");

let awsRoutes = express.Router()

const s3Client = new S3Client({
    region: "ap-southeast-2",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
})

//#1 Retrieve One
awsRoutes.route("/images/:id").get(verifyToken, async(request, response) =>  {
    let db = database.getDb()
    let data = await db.collection("posts").findOne({_id: new ObjectId(request.params.id)})
    if(data && Object.keys(data).length > 0) {
        response.json(data)
    } else {
        response.status(404).json({ error: "Data was not found :" })
    }
})

//#2 Create One
awsRoutes.route("/images").post(verifyToken, async(request, response) =>  {
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

//#3 Delete One
awsRoutes.route("/images/:id").delete(verifyToken, async(request, response) =>  {
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

module.exports = awsRoutes;