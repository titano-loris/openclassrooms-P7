//Préparez la base de données pour les informations d'authentification
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Création du model User pour un stockage dans la base de données
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean }
});

// uniqueValidator = évite que plusieurs utilisateurs s'inscrivent avec le même mail (installer npm)
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema);