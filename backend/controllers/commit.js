const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
async function commitRepo (message) {
    console.log("commit Called");
    const repoPath = path.resolve(process.cwd(), ".apnaGit");
    const stagedPath = path.resolve(repoPath, "staging");
    const commitsPath = path.join(repoPath, "commits");
    try {
        const commitID = uuidv4();
        const commitDir = path.join(commitsPath, commitID);
        await fs.mkdir(commitDir, {recursive: true});
        const files = await fs.readdir(stagedPath);

        for (let file of files) {
            await fs.copyFile(path.join(stagedPath, file), path.join(commitDir, file));
            await fs.rm(path.join(stagedPath, file));
        }
        await fs.writeFile(path.join(commitDir, "commit.json"), JSON.stringify({message: message, date:new Date().toISOString()}));
        console.log(`Commit ${commitID} created with message: ${message}`);
    } catch (er) {
        console.error(`Error commiting files : ${er}`);
    }
}
module.exports = {commitRepo};