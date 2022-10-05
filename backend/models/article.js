const mongoose = require("mongoose");

const article = mongoose.Schema({
    userId: { type: String, required: false },
    title: { type: String, require: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: false },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] },
    //comments: [{ userId: String, content }]

});

module.exports = mongoose.model('article', article); //La méthode  model  transforme ce modèle en un modèle utilisable