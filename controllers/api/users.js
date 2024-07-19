const user = require("../../models/users");
const bcrypt = require("bcrypt");

exports.list = async (req, res, next) => {
  var users = await user.getAll();
  console.log(users);

  res.status(200).json({
    data: users,
  });
};
exports.login = async (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  let result = await user.login(username);
  if (result) {
    console.log(result);
    let hanshPasswordDB = result[0].password;
    let match =  bcrypt.compare(password, hanshPasswordDB);
    if (match) {
      res.status(201).json({
        status: 1,
        data: result,
      });
    }
  } else {
    console.log(`hiii`);
  }
};


exports.create = async (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  let name = req.body.name;
  let role = req.body.role;

  let hashPass = await bcrypt.hash(password,10);
  let users = {
    name: name,
    password: hashPass,
    email: email,
    username: username,
    role: role,
  };
  let result = await user.create(users);
  console.log(result);
  res.status(201).json({
    result: result,
    category: users,
  });
};

exports.detail = async (req, res, next) => {
  // const file = req.file
  let user_id = req.params.user_id;
  let result = await user.getById(user_id);
  console.log(result);
  // res.send(result);
  res.status(201).json({
    data: result,
  });
};
exports.update = async (req, res, next) => {
  let user_id = req.params.user_id;
  let name = req.body.name;
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  let role = req.body.role;
  let users = {
    name: name,
    password: password,
    email: email,
    username: username,
    role: role,
  };
  let result = await user.update(users, user_id);
  console.log(result);
  // res.send(result);
  res.status(201).json({
    result: result,
    category: users,
  });
};

exports.delete = async (req, res, next) => {
  let user_id = req.params.user_id;
  let result = await user.delete(user_id);
  console.log(result);
  // res.send(result);
  res.status(201).json({
    result: result,
  });
};
