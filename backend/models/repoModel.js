const mongoose = require("mongoose");
const { Schema } = mongoose;

const RepositorySchema = new Schema ({
    name : {
        type: String,
        require: true,
        unique: true,
    },
    description: {
        type: String, 
        required: true,
    },
    content: {
        type: [
            {
                type: String,
            }
        ]
    },
    visibility: {
        type: Boolean,
    },
    owner : {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    issues: {
        type : [
            {
                type: Schema.Types.ObjectId,
                ref: "Issue",
            }
        ]
    }
});

const Repository =  mongoose.model("Repository", RepositorySchema);
module.exports = Repository;