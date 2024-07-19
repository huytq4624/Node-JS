const products = require("../../models/products");

exports.list = async (req, res, next) => {
  var users = await products.getAll();
  console.log(users);
  res.status(200).json({
    data: users,
  });
};



exports.create = async (req, res, next) => {
  const file = req.file;
  let name = req.body.name;
  let price = req.body.price;
  let description = req.body.description;
  let category_id	= req.body.category_id;
  let image	= req.body.image;

  let users = {
    name: name,
    price:price,
    description: description,
    category_id:category_id,
    image:image
  };
  let result = await products.create(users);

  console.log(result);

  res.status(201).json({
    result: result,
    products: users,
  });
};

exports.detail = async (req, res, next) => {
  let product_id = req.params.product_id;
  let result = await products.getById(product_id);

  console.log(result);

  res.status(201).json({
    data: result,
  });
};

exports.update = async (req, res, next) => {
let product_id = req.params.product_id;
const file = req.file;
let name = req.body.name;
let price = req.body.price;
let description = req.body.description;
let category_id	= req.body.category_id;
let image	= req.body.image;

let product = {
  name: name,
  price:price,
  description: description,
  category_id:category_id,
  image:image
};
  let result = await products.update(product, product_id);

  console.log(result);
  // res.send(result);
  res.status(201).json({
    result: result,
    products :product ,
  });
};
exports.delete = async (req, res, next) => {
  let products_id = req.params.product_id;

  let result = await products.delete(products_id);

  console.log(result);
  // res.send(result);
  res.status(201).json({
    result: result,
  });
};
exports.loadProCate = async (req, res, next) => {
  const category_id = req.params.category_id;
  var users = await products.loadProCate(category_id);
  console.log(users);

  res.status(200).json({
    data: users,
  });
};