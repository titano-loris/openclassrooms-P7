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
    Article.likes({ articleId: req.params.id })
        .then(like => {
            console.log(like);
            res.status(200).json({ data: like });
        })
        .catch(error => res.status(400).json({ error }));
};

// Création like ou dislike (Post/:id/like)
exports.createLike = (req, res, next) => {
    // Si l'utilisateur aime 
    // On ajoute 1 like et on l'envoie dans le tableau "usersLiked"

    if (req.body.like === 1) {
        Article.updateOne({ _id: req.params.id }, { $inc: { likes: req.body.like++ }, $push: { usersLiked: req.body.userId } })
            .then((Article) => res.status(200).json({ message: 'Like ajouté !' }))
            .catch(error => res.status(400).json({ error }));

        // Si l'utilisateur n'aime pas
        // On ajoute 1 dislike et on l'envoie dans le tableau "usersDisliked"

    } else if (req.body.like === -1) {
        Article.updateOne({ _id: req.params.id }, { $inc: { dislikes: (req.body.like++) * -1 }, $push: { usersDisliked: req.body.userId } })
            .then((Article) => res.status(200).json({ message: 'Dislike ajouté !' }))
            .catch(error => res.status(400).json({ error }));

        // Si like === 0 l'utilisateur supprime son vote
    } else {

        Article.findOne({ _id: req.params.id })
            .then(Article => {
                // Si le tableau "userLiked" contient l'ID de l'utilisateur
                if (Article.usersLiked.includes(req.body.userId)) {
                    // On enlève un like du tableau "userLiked" 
                    Article.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
                        .then((Article) => { res.status(200).json({ message: 'Like supprimé !' }) })
                        .catch(error => res.status(400).json({ error }))
                } else if (Article.usersDisliked.includes(req.body.userId)) {
                    // Si le tableau "userDisliked" contient l'ID de l'utilisateur
                    // On enlève un dislike du tableau "userDisliked" 
                    Article.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
                        .then((Article) => { res.status(200).json({ message: 'Dislike supprimé !' }) })
                        .catch(error => res.status(400).json({ error }))
                }
            })
            .catch(error => res.status(400).json({ error }));
    }
};
