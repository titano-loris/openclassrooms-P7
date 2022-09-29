const Article = require('../models/article');
const fs = require('fs');

// logique métier : lire tous articles
exports.findAllArticles = (req, res, next) => {
    Article.findAll({
        order: [
            ['createdAt', 'DESC'],
        ]
    })
        .then(articles => {
            console.log(articles);
            res.status(200).json({ data: articles });
        })
        .catch(error => res.status(400).json({ error }));
};

// logique metier:trouver tout les articles d'un utilisateur avec sont id
exports.findArticlesByUserId = (req, res, next) => {
    Article.findAll({
        where: { userId: req.params.id },
        order: [
            ['createdAt', 'DESC'],
        ]
    })
        .then(articles => {
            console.log(articles);
            res.status(200).json({ data: articles });
        })
        .catch(error => res.status(400).json({ error }));
};

// logique métier : lire un article par son id
exports.findOneArticle = (req, res, next) => {
    Article.findOne({ where: { id: req.params.id } })
        .then(article => {
            console.log(article);
            res.status(200).json(article)
        })
        .catch(error => res.status(404).json({ error }));
};

// logique métier : créer un article
exports.createArticle = (req, res, next) => {
    // éléments de la requète
    const title = req.body.title;
    const content = req.body.content;

    // vérification que tous les champs sont remplis
    if (title === null || title === '' || content === null || content === '') {
        return res.status(400).json({ 'error': "Veuillez remplir les champs 'titre' et 'contenu' pour créer un article" });
    }

    const articleObject = req.body;
    delete articleObject._id;
    delete articleObject._userId;
    // Création d'un nouvel objet article
    const article = new Article({
        ...articleObject,
        userId: req.auth.userId,
        timestamp: Date.now(),
        imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null,
        likes: parseInt(0),
        dislikes: parseInt(0),
        usersLiked: [],
        usersDisliked: []
    });
    // Enregistrement de l'objet article dans la base de données
    article.save()
        .then(() => res.status(201).json({ message: 'Article créé !' }))
        .catch(error => res.status(400).json({ error }));

}

// logique métier : modifier un article
exports.modifyArticle = (req, res, next) => {
    // éléments de la requète
    const title = req.body.title;
    const content = req.body.content;


    // vérification que tous les champs sont remplis
    if (title === null || title === '' || content === null || content === '') {
        return res.status(400).json({ 'error': "Veuillez remplir les champs 'Titre' et 'Contenu' pour créer un article" });
    }

    const articleObject = req.body;

    Article.update({ ...articleObject, id: req.params.id }, { where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Article modifié !' }))
        .catch(error => res.status(400).json({ error }));

    //comment.push (operateur push dans mongod pour inserer un element)
};

// Logique métier : supprimer un article
exports.deleteArticle = (req, res, next) => {
    Like.destroy({ where: { articleId: req.params.id } })
        .then(() =>
            Article.destroy({ where: { id: req.params.id } })
                .then(() => res.status(200).json({ message: 'Article supprimé !' }))
        )

        .catch(error => res.status(400).json({ error }));
};


// logique métier : lire tous les likes
exports.findAllLikes = (req, res, next) => {
    Like.findAll({
        where: {
            articleId: req.params.id
        }
    })
        .then(likes => {
            console.log(likes);
            res.status(200).json({ data: likes });
        })
        .catch(error => res.status(400).json({ error }));
};

// logique métier : créer un like
exports.createLike = (req, res, next) => {
    const likeObject = req.body;
    Like.findAll({
        where: {
            articleId: req.body.articleId,
            userId: req.body.userId
        }
    })
        .then(likes => {
            if (likes.length === 0) {
                const like = new Like({
                    ...likeObject
                });
                // Enregistrement de l'objet like dans la base de données
                like.save()
                    .then(() => {
                        Like.findAll({
                            where: { articleId: req.body.articleId }
                        }).then(likes => {
                            res.status(200).json({ like: likes.length });
                        })
                    })
                    .catch(error => res.status(400).json({ error }));
            } else {
                Like.destroy({
                    where: {
                        articleId: req.body.articleId,
                        userId: req.body.userId
                    }
                })
                    .then(() => {
                        Like.findAll({
                            where: { articleId: req.body.articleId }
                        }).then(likes => {
                            res.status(200).json({ like: likes.length });
                        })
                    })
                    .catch(error => res.status(400).json({ error }));
            }
        }
        )
}
