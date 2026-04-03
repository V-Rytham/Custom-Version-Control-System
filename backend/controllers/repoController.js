const mongoose = require('mongoose');
const Repository = require("../models/repoModel");
const Issue = require("../models/issueModel");
const User = require("../models/userModel");

const createRepository = async (req, res) => {
    const { owner, name, repositoryName, issues, content, description, visibility } = req.body;
    try {
        if (!name) {
            return res.status(400).json({error: "Repository name is required!"});
        }
        
        if (!mongoose.Types.ObjectId.isValid(owner)) {
            return res.status(400).json({error: "Invalid User ID!"});
        }

        const newRepository = new Repository ({
            name,
            description,
            visibility,
            owner,
            content,
            issues,
        });

        const result = await newRepository.save();

        res.status(201).json({
            message: `Repository created successfully`,
            repositoryID : result._id,
        });

    } catch (err) {
        console.error(`Error during repository creation : ${err}`);
        res.status(500).send("Server error");
    }
};

const getAllRepositories = async (req, res) => {
    try {
        const repositories = await Repository.find({}).populate("owner").populate("issues");
        res.json(repositories);
    } catch (err) {
        console.error(`Error during fetching ${err}`);
        res.status(500).send("Internal Server error");
    }
};

const fetchRepositoryById = async (req, res) => {
    const {id} = req.params;
    const repoID = id;
    try {
        const repository = await Repository.find({_id : repoID }).populate('owner').populate('issues');
        return res.json(repository);
    } catch (err) {
        console.error(`Error during fetching repository : ${err}`);
        res.status(500).send("Internal Server error");
    }
};

const fetchRepositoryByName = async (req, res) => {
    const { name } = req.params;
    const repoName = name;
    try {
        const repository = await Repository.find({ name : repoName }).populate('owner').populate('issues');
        return res.json(repository);
    } catch (err) {
        console.error(`Error during fetching repository : ${err}`);
        res.status(500).send("Internal Server error");
    }
};

const fetchRepositoryForCurrentUser = async (req, res) => {
    const userId = req.user;
    try {
        const repositories = await Repository.find({owner: userId});

        if (!repositories || repositories.length===0) {
            return res.status(404).json({message: "User Repositories not found!"});
        }

        res.json({message: "Repositories Found : ", repositories}); 
         
    } catch (err) {
        console.error(`Error during fetching ${err}`);
        res.status(500).send("Internal Server error");
    }
};

const updateRepositoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedRepo = await Repository.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedRepo) {
            return res.status(404).json({
                message: "Repository not found"
            });
        }
        res.status(200).json({
            message: "Repository updated successfully",
            data: updatedRepo
        });
    } catch (err) {
        console.error(`Error during updating: ${err}`);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const toggleVisibilityById = async (req, res) => {
    const {id} = req.params;
    try {
        const repository = await Repository.findById(id);
        if (!repository) {
            return res.status(404).json({ error : "Repository not found!"});
        }
        repository.visibility = !repository.visibility;
        const updatedRepository = await repository.save();
        res.json ({
            message: "Repository visibility toggled successfully!",
            repository: updatedRepository
        });
    } catch (err) {
        console.error(`Error during fetching ${err}`);
        res.status(500).send("Internal Server error");
    }
};

const deleteRepositoryById = async (req, res) => {
    const {id} = req.params;
    try {
        const repo = await Repository.findByIdAndDelete(id);
        if (!repo) {
            res.status(404).send("Repository Not Found");
        }
        res.status(200).json({message: "Repository deletion successful"});
    } catch (err) {
        console.error(`Error during fetching repository : ${err}`);
        res.status(500).send("Internal Server error");
    }
};

module.exports = {
    createRepository,
    getAllRepositories,
    fetchRepositoryById,
    fetchRepositoryByName,
    fetchRepositoryForCurrentUser,
    updateRepositoryById,
    toggleVisibilityById,
    deleteRepositoryById,
};