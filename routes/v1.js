var express = require('express');
const TestController = require('../src/controller/TestController');
const AuthController = require('../src/controller/AuthController');
const authenticateJWT = require('../src/middleware/auth');
const PostController = require('../src/controller/PostController');
var router = express.Router();


router.get('/tests', TestController.getAllProducts);
router.get('/tests/:id', TestController.getProductById);
router.post('/tests', TestController.createProduct);

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);


router.get('/posts', authenticateJWT, PostController.getAllPosts);
router.get('/posts/:id', authenticateJWT, PostController.getPostById);
router.post('/posts', authenticateJWT, PostController.createPost);


module.exports = router;
