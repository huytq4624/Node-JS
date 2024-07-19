// routes/application.js 
const express = require('express')

const categoriesController = require('../controllers/admin/categories');
const productsController = require('../controllers/admin/products');
const usersController = require('../controllers/admin/users');
const homeController = require('../controllers/admin/home');
const router = express.Router();
var multer = require('multer');
//khai báo sử dụng multer
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './accsets/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
var upload = multer({ storage: storage })
// *** Home

// GET /admin/ (hiển thị trang chủ admin)
router.get('/', homeController.home);



// *** Categories
//hiển thị ds danh mục
router.get('/categories', categoriesController.list);
//hiển thị form thêm
router.get('/categories/create', categoriesController.create);
// hiển thị form chỉnh sửa
router.get('/categories/edit/:category_id', categoriesController.edit);
//thực hiện thêm
router.post('/categories/create', categoriesController.store);
//thực hiện xóa
router.get('/categories/delete/:category_id', categoriesController.delete);
// thực hiện cập nhật
router.post('/categories/update/:category_id', categoriesController.update);
// *** End Categories

// *** Products
//hiển thị ds sản phẩm
router.get('/products', productsController.list);
//hiển thị form thêm
router.get('/products/create', productsController.create);
// hiển thị form chỉnh sửa
router.get('/products/edit/:product_id', productsController.detail);
//thực hiện thêm
router.post('/products/create',upload.single('image'), productsController.store);
//thực hiện xóa
router.get('/products/delete/:product_id',productsController.delete);
// thực hiện cập nhật
router.post('/products/update/:product_id',upload.single('image'),productsController.update);
// *** End Products

//User
//hiển thị danh sách
router.get('/users', usersController.list);
//hiển thị from thêm
router.get('/users/create', usersController.create);
//thực hiện thêm
router.post('/users/create', usersController.store);
//hiển thị theo id
router.get('/users/edit/:user_id', usersController.edit);
//xóa
router.get('/users/delete/:user_id', usersController.delete);
//
router.post('/users/update/:user_id', usersController.update);

module.exports = router;