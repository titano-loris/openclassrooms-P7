const mongoose = require("mongoose");

const article = mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, require: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] },

});

module.exports = mongoose.model('article', article); //La méthode  model  transforme ce modèle en un modèle utilisable