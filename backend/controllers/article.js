const Article = require('../models/article');
const fs = require('fs');

// logique métier : lire tous articles
exports.findAllArticles = (req, res, next) => {
    Article.find({
        order: [
            ['createdAt', 'DESC'],
        ]
    })
        .then(articles => {
            //console.log(articles);
            res.status(200).json({ data: articles });
        })
        .catch(error => res.status(400).json({ error }));
};

// logique metier:trouver tout les articles d'un utilisateur avec sont id
exports.findArticlesByUserId = (req, res, next) => {
    Article.findOne({ userId: req.params.id })
        .then(articles => {
            console.log(articles);
            res.status(200).json({ data: articles });
        })
        .catch(error => res.status(400).json({ error }));
};

// logique métier : lire un article par son id
exports.findOneArticle = (req, res, next) => {
    Article.findOne({ id: req.params.id })
        .then(article => {
            console.log(article);
            res.status(200).json(article)
        })
        .catch(error => res.status(404).json({ error }));
};

// logique métier : créer un article
exports.createArticle = (req, res, next) => {
    console.log('title', req.body)
    const title = req.body.title;
    const content = req.body.content;
    // vérification que tous les champs sont remplis
    if (title === null || title === '' || content === null || content === '') {
        return res.status(400).json({ 'error': "Veuillez remplir les champs 'titre' et 'contenu' pour créer un article" });
    }
    // Création d'un nouvel objet article
    const article = new Article({
        title: title,
        content: content,
        userId: "54545454iu",
        timestamp: Date.now(),
        imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null,//protocole http"://" et appel hote requet(host) pour localhost3000
        likes: parseInt(0),
        dislikes: parseInt(0),
        usersLiked: [],
        usersDisliked: []
    });
    // Enregistrement de l'objet article dans la base de données
    article.save()
        .then(() => res.status(201).json({ message: 'Article créé !' }))
        .catch(error => { console.log('here---', error) });

}

// logique métier : modifier un article
exports.modifyArticle = (req, res, next) => {
    // éléments de la requète
    const titleReq = req.body.title;
    const contentReq = req.body.content;
    const imageReq = req.body.imageUrl;
    console.log("In PUT : modifyArticl")
    console.log("Informations : ")
    console.log("Title : " + titleReq)
    console.log("Content : " + contentReq)

    // vérification que tous les champs sont remplis
    if (titleReq === null || titleReq === '' || titleReq == undefined || contentReq == undefined || contentReq === null || contentReq === '') {
        return res.status(400).json({ 'error': "Veuillez remplir les champs 'Titre' et 'Contenu' pour créer un article" });
    } else {
        const articleObject = req.body;

        Article.updateOne(
            { _id: req.params.id },
            {
                title: titleReq,
                content: contentReq,
                imageUrl: imageReq
            })
            .then(() => res.status(200).json({ message: 'Article modifié Loris !' }))
            .catch(error => res.status(400).json({ error }));
    }




};

// Logique métier : supprimer un article
exports.deleteArticle = (req, res, next) => {

    Article.deleteOne({ id: req.params.id })
        .then(() => res.status(200).json({ message: 'Article supprimé !' }))

};


// logique métier : lire tous les like
exports.findAllLikes = (req, res, next) => {
    Like.find({ articleId: req.params.id })
        .then(like => {
            console.log(like);
            res.status(200).json({ data: like });
        })
        .catch(error => res.status(400).json({ error }));
};

// logique métier : créer un like
exports.createLike = (req, res, next) => {
    const likeObject = req.body;
    Like.find({
        articleId: req.body.articleId,
        userId: req.body.userId
    })
        .then(like => {
            if (like.length === 0) {
                const like = new like({
                    ...likeObject
                });
                // Enregistrement de l'objet like dans la base de données
                like.save()
                    .then(() => {
                        like.find({
                            articleId: req.body.articleId
                        })
                            .then(like => {
                                res.status(200).json({ like: like.length });
                            })
                    })
                    .catch(error => res.status(400).json({ error }));
            } else {
                like.deleteOne({
                    where: {
                        articleId: req.body.articleId,
                        userId: req.body.userId
                    }
                })
                    .then(() => {
                        like.find({
                            articleId: req.body.articleId
                        })
                            .then(like => {
                                res.status(200).json({ like: like.length });
                            })
                    })
                    .catch(error => res.status(400).json({ error }));
            }
        }
        )
}