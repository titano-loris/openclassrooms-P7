const article = require("../models/article");
const fs = require('fs');
const User = require("../models/User");
// logique métier : lire tous utilisateurs pour administrateur
exports.findAllUsers = (req, res, next) => {
    User.find()
        .then(users => {
            console.log(users);
            res.status(200).json({ data: users });
        })
        .catch(error => res.status(400).json({ error }));
};

// logique métier : lire un utilisateur par son id
exports.findOneUser = (req, res, next) => {
    console.log("Find One User ?")
    User.findOne({ where: { id: req.params.id } })
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => res.status(404).json({ error }));
};

// logique métier : lire un utilisateur par son id
exports.findAllUserByName = (req, res, next) => {

    User.findAll({ where: { firstname: req.params.name } })
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => res.status(404).json({ error }));
};

// logique métier : modifier un utilisateur
exports.modifyUser = (req, res, next) => {
    // éléments de la requète
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    // vérification que tous les champs sont remplis
    if (firstname === null || firstname === '' || lastname === null || lastname === '') {
        return res.status(400).json({ 'error': "Les champs 'nom' et 'prénom' doivent être remplis " });
    }
    // gestion d'ajout/modification image de profil
    const userObject = req.file ?
        {
            ...req.body.user,
            imageUrl: req.file.filename
        } : { ...req.body };

    User.updateOne({ ...userObject, id: req.params.id }, { id: req.params.id })
        .then(() => res.status(200).json({ message: 'Utilisateur modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

// logique métier : supprimer un utilisateur
exports.deleteUser = (req, res, next) => {
    Like.deleteOne({ userId: req.params.id })
        .then(() =>
            Comment.deleteOne({ userId: req.params.id })
                .then(() =>
                    article.findAll({ userId: req.params.id })
                        .then(
                            (articles) => {
                                articles.forEach(
                                    (article) => {
                                        Comment.deleteOne({ articleId: article.id })
                                        Like.deleteOne({ articleId: article.id })
                                        article.deleteOne({ id: article.id })
                                    }
                                )
                            }
                        )
                        .then(() =>
                            User.findOne({ id: req.params.id })
                                .then(user => {
                                    const filename = user.imageUrl;
                                    fs.unlink(`images/${filename}`, () => {
                                        User.deleteOne({ id: req.params.id })
                                            .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
                                    })
                                })
                        )
                )
        )
        .catch(error => res.status(400).json({ error }));
};