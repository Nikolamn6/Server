const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    img: { data: Buffer, contentType: String },
    name: String, 
    email: String,
    title: String,
    content: String,
    date: String,
    type: String
}, {
    collection: "BlogInfo"
});

module.exports = BlogModel = mongoose.model("Blog", blogSchema);