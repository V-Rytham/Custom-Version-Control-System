const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const signup = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).send("All fields are required");
        }
        const user = await User.findOne({username:username});
        if (user) 
            return res.status(400).send("User already exists cannot signup");

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            repositories:[],
            followedUser:[],
            starredRepos: [], 
        });

        const result = await newUser.save();

        const token = jwt.sign({id: result._id}, process.env.JWT_SECRET_KEY, {expiresIn:"1h"})
        res.status(201).json({token,userId: result._id});
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
};

const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({message: "Invalid Credentials"});
        } 
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({message: "Invalid Credentials"});
        }
        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "1h"});
        res.json({token, userId:user._id});
    } catch (err) {
        console.error("Error during login: ", err.message);
        res.status(500).send("Server error!");
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        console.error("Error during fetching ! ", err);
        res.status(500).send("Server error!");
    }
};

const getUserProfile = async (req, res) => {
    const currentId = req.params.id;
    try {
        const user = await User.findById(currentId);
        if (!user) {
            return res.status(404).send(`User not found!`);
        } 
        return res.status(200).json({user});
    } catch (err) {
        console.error(`Error : ${err}`);
        res.status(500).send(`Error!`);
    }
}

const updateUserProfile = async (req, res) => {
    const currentID = req.params.id;
    const { email, password } = req.body;

    try {
        let updateFields = {email};
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateFields.password = hashedPassword;
        }
        const result = await User.findByIdAndUpdate(currentID, updateFields, { new: true });
        if (!result) {
            res.status(404).json({message: "User not found!"});
        }
        res.send(result);
    } catch (err) {
        console.error(`Error during updation : ${err}`);
        res.status(500).send("Server error");
    }
}

const deleteUserProfile = async (req, res) => {
    const currentID = req.params.id;
    try {
        const result = await User.findByIdAndDelete(currentID);
        if (!result) {
            return res.status(404).json({message: "User not found!"});
        }
        return res.status(200).json({message: "User Profile Deleted"});
    } catch (err) {
        console.error(`Error during updation : ${err}`);
        res.status(500).send("Server error");
    }

}

module.exports = {
    getAllUsers,
    signup,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
};