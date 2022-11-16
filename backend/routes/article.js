const express = require('express');
const router = express.Router();
const articleCtrl = require('../controllers/article');

const multer = require('../middleware/multer');
const auth = require('../middleware/auth');

// Routes
router.get('/', auth, articleCtrl.findAllArticles);
router.get('/', articleCtrl.findArticlesByUserId);
router.get('/:id', articleCtrl.findOneArticle);
router.post('/', auth, multer, articleCtrl.createArticle);
router.put('/:id', auth, multer, articleCtrl.modifyArticle);
router.delete('/:id', auth, articleCtrl.deleteArticle);
router.get('/', articleCtrl.findAllLikes);
router.post('/:id/like', auth, multer, articleCtrl.createLike);

module.exports = router;
