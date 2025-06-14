const express = require('express');
const database = require("./connect")
const ObjectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken');
require("dotenv").config({path: "./config.env"})

const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

let awsRoutes = express.Router()
const s3Bucket = "storageblog1"

const s3Client = new S3Client({
    region: "ap-southeast-2",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
})

//#1 Get Presigned URL for Image
awsRoutes.route("/images/:id/url").get(verifyToken, async(request, response) =>  {
    try {
        const id = request.params.id;
        const bucketParams = {
            Bucket: s3Bucket,
            Key: id,
        };

        // Generate presigned URL (valid for 1 hour)
        const url = await getSignedUrl(s3Client, new GetObjectCommand(bucketParams), { 
            expiresIn: 3600 
        });

        response.json({
            url: url,
            expiresIn: 3600
        });
    } catch (err) {
        response.status(500).json({ error: "Failed to generate image URL", details: err.message });
    }
});

//#1 Retrieve One (Keep for backward compatibility)
awsRoutes.route("/images/:id").get(verifyToken, async(request, response) =>  {
    try {
        const id = request.params.id;
        const bucketParams = {
            Bucket: s3Bucket,
            Key: id,
        };

        const data = await s3Client.send(new GetObjectCommand(bucketParams));
        const contentType = data.ContentType;
        // Await the stream-to-string conversion!
        const srcString = await data.Body.transformToString('base64');
        response.json({
            data: srcString,
            contentType: contentType
        });
    } catch (err) {
        response.status(500).json({ error: "Failed to fetch image", details: err.message });
    }
});

//#2 Create One
awsRoutes.route("/images").post(verifyToken, async(request, response) =>  {
    try {
        const file = request.files[0]
        console.log(file)
        const bucketParams = {
            Bucket: s3Bucket,
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype // Set proper content type
        }

        const data = await s3Client.send(new PutObjectCommand(bucketParams))

        // Return both the upload result and a presigned URL for immediate use
        const getParams = {
            Bucket: s3Bucket,
            Key: file.originalname,
        };
        
        const url = await getSignedUrl(s3Client, new GetObjectCommand(getParams), { 
            expiresIn: 3600 
        });

        response.json({
            ...data,
            imageUrl: url,
            key: file.originalname
        })
    } catch (err) {
        response.status(500).json({ error: "Failed to upload image", details: err.message });
    }
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