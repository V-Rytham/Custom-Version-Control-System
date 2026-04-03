const path = require("path");
const fs = require("fs").promises;
async function addRepo(filePath) {
    filePath = path.resolve(filePath);
    const stagingPath = path.resolve(process.cwd(), ".apnaGit", "staging");
    try {
        await fs.mkdir(stagingPath, {recursive: true});
        const fileName = path.basename(filePath);
        await fs.copyFile(filePath, path.join(stagingPath, fileName));
        console.log(`File ${fileName} add to the staging `);
    } catch (err) {
        console.error(`Error Adding File: ${err}`);
    }
}
module.exports = {addRepo}; 