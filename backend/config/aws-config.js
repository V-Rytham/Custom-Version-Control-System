const { S3Client, PutObjectCommand, ListObjectsV2Command, GetObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY

  },
});

const S3_BUCKET = "rythambucket1";

module.exports = { s3, S3_BUCKET, PutObjectCommand, ListObjectsV2Command, GetObjectCommand };

