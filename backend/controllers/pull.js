const { s3, S3_BUCKET, ListObjectsV2Command, GetObjectCommand } = require("../config/aws-config");
const fs = require("fs").promises;
const fsSync = require("fs");
const path = require("path");

async function pullRepo() {
    const repoPath = path.resolve(process.cwd(), ".apnaGit");
    const commitsFromS3Path = path.join(repoPath, "commitsFromS3");

    try {
        await fs.mkdir(commitsFromS3Path, { recursive: true });

        const response = await s3.send(new ListObjectsV2Command({
            Bucket: S3_BUCKET,
            Prefix: "commits/",
        }));

        const files = response.Contents || [];

        await Promise.all(files.map(async (object) => {
            if (object.Key.endsWith("/")) return;

            const key = object.Key.replace("commits/", "");
            const fullPath = path.join(commitsFromS3Path, key);

            const fileObj = await s3.send(new GetObjectCommand({
                Bucket: S3_BUCKET,
                Key: object.Key,
            }));

            await fs.mkdir(path.dirname(fullPath), { recursive: true });

            const writeStream = fsSync.createWriteStream(fullPath);
            fileObj.Body.pipe(writeStream);
        }));

        console.log("All files pulled successfully");

    } catch (err) {
        console.error("Unable to pull : ", err);
    }
}

module.exports = { pullRepo };