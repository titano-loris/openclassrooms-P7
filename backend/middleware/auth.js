// utiliser web token et validation de user id 
//va vérifier que l’utilisateur est bien connecté et transmettre les informations de connexion aux différentes méthodes qui vont gérer les requêtes.
const jwt = require('jsonwebtoken');

// coder la logique du middleware = Validation userId en comparaison avec le token
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];  //recuperation du tokken a travers le header donc avec splitz diviser la chaine de caractére en un tableau on recupere le tokken qui est en deuxiéme
        const decodedToken = jwt.verify(token, 'token-mystere');//decoder le tokken recuperé avec 'verify' de jwt ainsi que la clef secrete 'RANDOM_TOKEN_SECRET'
        const userId = decodedToken.userId;      // recuperer userId avec la const decodedToken
        req.auth = { // request permet aux différente routes d'exploiter id 
            userId: userId
        };
        next(); //si tout se passe bien appeler la fonction
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
};