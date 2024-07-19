// routes/api.js


const express = require('express')

const categoriesAPIController = require('../controllers/api/categories');
const productsAPIController = require('../controllers/api/products');
const usersAPIController = require('../controllers/api/users');

const router = express.Router();

//**Categories  
//hiển thị daanh sách
router.get('/categories/', categoriesAPIController.list);
//thêm danh mục
router.post('/categories/', categoriesAPIController.create);
//xóa danh mục
router.delete('/categories/:category_id', categoriesAPIController.delete);
//hiển thị chi tiết
router.get('/categories/:category_id', categoriesAPIController.detail);
//cập nhật danh mục
router.put('/categories/:category_id', categoriesAPIController.update);


//**Products 
router.get('/products/', productsAPIController.list);
//thêm danh mục
router.post('/products/', productsAPIController.create);
//xóa danh mục
router.delete('/products/:product_id', productsAPIController.delete);
//hiển thị chi tiết
router.get('/products/:product_id', productsAPIController.detail);
//cập nhật danh mục
router.put('/products/:product_id', productsAPIController.update);
//hiển thị sản phẩm theo id danh mục
router.get('/products/categories/:category_id', productsAPIController.loadProCate);


//user
//hiển thị danh sách
router.get('/users/', usersAPIController.list);
//thực hiện thêm
router.post('/users/', usersAPIController.create);

router.post('/users/login', usersAPIController.login);
//hiển thị user theo id
router.get('/users/:user_id', usersAPIController.detail);
router.put('/users/:user_id', usersAPIController.update);
//xóa user
router.delete('/users/:user_id', usersAPIController.delete);

//thực hiện đăng nhập
router.post('/signup/',usersAPIController.create);
//thực hiện đăng kí
router.post('/login/',usersAPIController.login);
module.exports = router;