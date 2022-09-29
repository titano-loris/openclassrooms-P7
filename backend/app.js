/*import=
validator: permet de s'assurer que le mot de passe de l'utilisateur est correct
bp = npm package pour afficher le corp de la requete
*/
const mongoose = require('mongoose');
const express = require('express'); //import package express
const bodyParser = require('body-parser');//package bodyparser
const path = require('path');

const routeArticle = require('./routes/article');
const routeAuth = require('./routes/auth');
const routeUser = require('./routes/user');


//connexion mongoDB
const uri = "mongodb+srv://hackNwin:rYv2DVlaaK20un71@cluster0.flfw3f2.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("connection mongodb success"))
    .catch(() => console.log("connection failed"));


const app = express();

app.use(express.json()); //intercepte toutes les requetes qui on un 'content type json'

//les access control
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');//accée depuis n'importe quelle origine '*'
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');//ajoute les header mentionner au requete vers API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//methode de requette http
    next();
});
app.use(bodyParser.json());//permet de rendre lisible les reponses et requetes http

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/article', routeArticle);
app.use('/api/auth', routeAuth);
app.use('/api/user', routeUser);
module.exports = app;//exporter express (app)sur les autres applications
