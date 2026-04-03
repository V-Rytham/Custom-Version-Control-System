const mongoose = require("mongoose");
const {Schema} = mongoose;

const UserSchema = new Schema({
    username : {
        type: String,
        required: true,
        unique: true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    repositories : [
        {
            default: [],
            type: mongoose.Schema.ObjectId,
            ref: "Repository",
        }
    ],
    followedUsers: {
        type: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            }
        ],
        default: [],
    },
    repoStarred : [
        {
            default: [],
            type: mongoose.Schema.Types.ObjectId,
            ref: "Repository",
        },
    ],    
});

const User = mongoose.model("User", UserSchema);
module.exports = User;