const Issue = require("../models/issueModel");

const createIssue = async (req, res) => {
    const { title, description, repository } = req.body;

    try {
        const issue = new Issue({
            title,
            description,
            repository,
        });
        await issue.save();
        res.status(201).json(issue);
    } catch (err) {
        console.error(`Error during issue creation : ${err}`);
        res.status(500).send("Server error");
    }
};

const updateIssueById = async (req, res) => {
    const { title, description, status } = req.body;
    const { id } = req.params;

    try {
        const issue = await Issue.findById(id);

        if (!issue) {
            return res.status(404).json({ error: "Issue not found!" });
        }

        issue.title = title;
        issue.description = description;
        issue.status = status;

        await issue.save();
        res.json(issue);
    } catch (err) {
        console.error(`Error during issue updation : ${err}`);
        res.status(500).send("Server error");
    }
};

const deleteIssueById = async (req, res) => {
    const { id } = req.params;

    try {
        const issue = await Issue.findByIdAndDelete(id);
        if (!issue) {
            return res.status(404).json({ error: "Issue not found! " });
        }
        res.status(200).json(issue);
    } catch (err) {
        console.error(`Error during issue deletion : ${err}`);
        res.status(500).send("Server error");
    }
};

const getAllIssues = async (_req, res) => {
    try {
        const issues = await Issue.find({});
        res.status(200).json(issues);
    } catch (error) {
        console.error(`Error fetching all the issues: ${error}`);
        res.status(500).send("Server error");
    }
};

const getIssueById = async (req, res) => {
    const { id } = req.params;

    try {
        const issue = await Issue.findById(id);

        if (!issue) {
            return res.status(404).json({ error: "Issue not found!" });
        }
        res.json(issue);
    } catch (err) {
        console.error(`Error during issue updation : ${err}`);
        res.status(500).send("Server error");
    }
};

module.exports = {
    createIssue,
    updateIssueById,
    deleteIssueById,
    getAllIssues,
    getIssueById,
};
