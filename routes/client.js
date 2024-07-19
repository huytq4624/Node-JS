const express = require('express')

const productsController = require('../controllers/client/products');
const categoriesController = require('../controllers/client/categories');
const homeController = require('../controllers/client/home');
const userController = require('../controllers/client/user');
const router = express.Router();
//hiển thị trang chủ
router.get('/', homeController.list);
//hiển thị trang sản phẩm
router.get('/products', productsController.list);
//hiển thị trang chi tiết sản phẩm
router.get('/products/detail/:product_id', productsController.detail);
//hiển thị trang sản phẩm theo danh mục
router.get('/products/categories/:category_id', productsController.listProCate);
//hiển thị trang giỏ hàng
router.get('/products/card',productsController.cart)
//hiển thị danh mục 
router.get('/cate_header',  categoriesController.list);
//hiển thị trang liên hệ
router.get('/contact',homeController.contact)
//hiện thị trang đăng nhập
router.get('/login',userController.loginF)
//thực hiện đăng nhập
router.post('/login',userController.login)
//hiển thị trang đăng kí
router.get('/signup',userController.signup)
//thực hiện đăng kí
router.post('/signup',userController.store)
//thực hiện đăng xuất
router.get('/logout',userController.logout)

//giỏ hàng
router.post('/addCart',userController.addCart)
router.get('/addCart',userController.addCart)

module.exports = router;