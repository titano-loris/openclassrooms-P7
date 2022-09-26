//paramettrage des formats images
const multer = require('multer');

//modification de l'extention des fichiers
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};
//destination
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')    //null signifit qu'il n'y apas eu d'erreur et on l'envoi dans le dossier images
    },
    //le nom du fichier a utiliser
    filename: (req, file, callback) => {
        const name = file.originalname.split('').join('_');//accee du nom d'origine et utiliser split pour remplacer les espace avec underscore
        const extension = MIME_TYPES[file.mimetype];//generer extension du fichier
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage }).single('image');