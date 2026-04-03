const {s3, S3_BUCKET, PutObjectCommand} = require("../config/aws-config");
const fs = require("fs").promises;
const path = require("path");

async function pushRepo () {
    const gitPath = path.resolve(process.cwd(), ".apnaGit");
    const commitsPath = path.join(gitPath, "commits");
    try {
        const commitsDirs = await fs.readdir(commitsPath);
        for (const commitDir of commitsDirs) {
            const commitPath = path.join(commitsPath, commitDir);
            const files = await fs.readdir(commitPath);

            for (const file of files) {
                const filePath = path.join(commitPath, file);
                const fileContent = await fs.readFile(filePath);
                const Params = new PutObjectCommand({
                    Bucket: S3_BUCKET,
                    Key : `commits/${commitDir}/${file}`,
                    Body: fileContent,
                });
                
                await s3.send(Params);
            }
        }
        console.log("All Commits pushed to s3");

    } catch (err) {
        console.error(`Error pushing commits to aws ${err}`);
    }
}
module.exports = {pushRepo};