const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Logiques métiers pour les utilisateurs
// Création de nouveaux utilisateurs (Post signup)
exports.signup = (req, res, next) => {
    // éléments de la requète
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;

    // vérification que tous les champs sont remplis
    if (firstname === null || firstname === '' || lastname === null || lastname === ''
        || email === null || email === '' || password === null || password === '') {
        return res.status(400).json({ 'error': "Veuillez remplir l'ensemble des champs du formulaire" });
    }

    // vérification si l'user existe
    User.findOne({ email: email })
        .then((userFound) => {
            // si l'utilisateur n'existe pas 
            if (!userFound) {
                // Hash du mot de passe avec bcrypt
                bcrypt.hash(password, 10)
                    .then(hash => {
                        // Création du nouvel utilisateur
                        const user = new User({
                            firstname: firstname,
                            lastname: lastname,
                            email: email,
                            password: hash
                        })
                        // Sauvegarde dans la base de données
                        user.save()
                            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                            .catch(error => res.status(400).json({ error }));
                    })
            } else if (userFound) {
                return res.status(409).json({ error: "L'utilisateur existe déjà !" })
            }
        })
        .catch(error => res.status(500).json({ error }));
};

// Création de connexion d'utilisateur enregistré (Post login)
exports.login = (req, res, next) => {

    // Masquage de l'adresse mail
    let emailFromReq = req.body.email;
    console.log("Email user to check : " + JSON.stringify(emailFromReq))
    // Recherche d'un utilisateur dans la base de données
    User.findOne({ email: emailFromReq })
        .then(user => {
            // Si on ne trouve pas l'utilisateur
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' })
            }
            console.log("User found !")
            // On compare le mot de passe de la requete avec celui de la base de données
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' })
                    }
                    res.status(200).json({
                        userId: user.id,
                        // Création d'un token pour sécuriser le compte de l'utilisateur
                        token: jwt.sign(
                            { userId: user.id },
                            'token-mystere',
                            { expiresIn: '1h' }
                        ),
                        isAdmin: user.isAdmin ? true : false
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}; 