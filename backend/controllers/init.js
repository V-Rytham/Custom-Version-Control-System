const fs = require("fs").promises;
const path = require("path");
async function initRepo () {
    const repoPath = path.resolve(process.cwd(), ".apnaGit");
    const commitsPath = path.join(repoPath, "commits");
    
    try {
        await fs.mkdir(repoPath, {recursive: true});
        await fs.mkdir(commitsPath, {recursive: true});
        await fs.writeFile(
            path.join(repoPath, "config.json"), 
            JSON.stringify({bucket: process.env.S3_BUCKET})
        );
        console.log("Repository created");
    } catch (err) {
        console.error(`Failed to initialise git, ${err}`);
    }
}

module.exports = { initRepo };