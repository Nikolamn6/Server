const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({
    img: { data: Buffer, contentType: String },
    name: String, 
    email: String,
    phone: String,
    title: String,
    description: String,
    category: String,
    price: String,
}, {
    collection: "PostInfo"
});

module.exports = ImageModel = mongoose.model("Image", imgSchema);