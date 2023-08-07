const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    title: {
        type: String,
        max: 200
    },
    description: {
        type: String,
        max: 200
    },
    img: {
        type: String,
    },
    likes: {
        type: Array,
        default: [],
    },
},
    {timeStamps: true}
);

module.exports = mongoose.model("Post", PostSchema); //export PostSchema as "Post"