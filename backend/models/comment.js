const mongoose = require("mongoose");

const comment = mongoose.Schema({
    userId: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: true },
})

module.exports = mongoose.model(); //La méthode  model  transforme ce modèle en un modèle utilisable