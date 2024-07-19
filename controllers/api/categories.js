// controllers/api/categories.js
const category = require("../../models/category");

exports.list = async (req, res, next) => {
  var users = await category.getAll();
  console.log(users);

  res.status(200).json({
    data: users,
  });
};



exports.create = async (req, res, next) => {
  // const file = req.file


  let name = req.body.name;

  let users = {
    name: name,
  
  };
  let result = await category.create(users);

  console.log(result);
  // // res.send(result);

  res.status(201).json({
    result: result,
    category: users,
  });
};

exports.detail = async (req, res, next) => {
  // const file = req.file

  let category_id = req.params.category_id;

  let result = await category.getById(category_id);

  console.log(result);
  // res.send(result);

  res.status(201).json({
    data: result,
  });
};
exports.update = async (req, res, next) => {
let category_id = req.params.category_id;
  let name = req.body.name;


  let cate = {
    name: name,
   
  };
  let result = await category.update(cate, category_id);

  console.log(result);
  // res.send(result);
  res.status(201).json({
    result: result,
    category:cate ,
  });
};
exports.delete = async (req, res, next) => {
  let category_id = req.params.category_id;

  let result = await category.delete(category_id);

  console.log(result);
  // res.send(result);
  res.status(201).json({
    result: result,
  });
};
