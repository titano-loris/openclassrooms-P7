const express = require('express');
const router = express.Router();
const articleCtrl = require('../controllers/article');

const auth = require('../middleware/multer');

// Routes
router.get('/', articleCtrl.findAllArticles);
router.get('/', articleCtrl.findArticlesByUserId);
router.get('/:id', articleCtrl.findOneArticle);
router.post('/', articleCtrl.createArticle);
router.put('/:id', articleCtrl.modifyArticle);
router.delete('/:id', articleCtrl.deleteArticle);
router.get('/', articleCtrl.findAllLikes);
router.post('/', articleCtrl.createLike);

module.exports = router;