
// ****API
const user = require("../../models/category");
//  hiển thị danh sách danh mục
exports.list = async (req, res, next) => {
  // gọi api
  fetch("http:/localhost:3000/api/categories/")
    .then((response) => response.json())
    .then((data) => {
      // hiển thị ra giao diện
      res.render("admin/categories/list-categories", {
        categories: data.data,
      });
    })
    .catch((error) => console.error("Error:", error));
};

// hiển thị form thêm
exports.create = (req, res, next) => {
  res.render("admin/categories/add-categories");
};


// thực hiện thêm
exports.store = async (req, res, next) => {
  // gọi api
  let name = req.body.name;
  //bắt lỗi danh mục rỗng
  if ( !name ) {
    res.locals.error_name = "Danh mục không được để trống";
    return res.render('admin/categories/add-categories', { 
        error: res.locals.error_name , 
     });
     
  }
  //bắt lỗi danh mục đã tồn tại
  const nameExists = await user.checkNameCate(name);
  if (nameExists) {
    res.locals.error_name = "Danh mục đã tồn tại";
    return res.render('admin/categories/add-categories', { 
        error: res.locals.error_name , 
     });
  }
  let users = {
    name: name
  };
  fetch("http:/localhost:3000/api/categories/", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(users), // body data type must match "Content-Type" header
  })
    .then((response) => response.json())
    .then((data) => {
      // res.send(data)
      if (data.result.affectedRows) {
        res.redirect("/admin/categories");
      } else {
        res.send("Lỗi không thể thêm");
      }
      // hiển thị ra giao diện
      // res.redirect('/admin/categories/')
    })
    .catch((error) => console.error("Error:", error));
};

  

//  (hiển thị form chỉnh sửa)
exports.edit = (req, res, next) => {
  // gọi api
  let category_id = req.params.category_id;
  fetch(`http:/localhost:3000/api/categories/${category_id}`)
    .then((response) => response.json())
    .then((data) => {
      // hiển thị ra giao diện
      res.render("admin/categories/edit-categories", {
        category: data.data[0],
      });
    })
    .catch((error) => console.error("Error:", error));
};

//  (thực hiện cập nhật)
exports.update = async (req, res, next) => {
  // gọi api
  let category_id = req.params.category_id;
  let name = req.body.name;
  
  let users = {
    name: name,
  
  };

  // res.send(req.body)
  fetch(`http:/localhost:3000/api/categories/${category_id}`, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(users), // body data type must match "Content-Type" header
  })
    .then((response) => response.json())
    .then((data) => {
      // res.send(data)
      if (data.result.affectedRows) {
        res.redirect("/admin/categories");
        
      } else {
      }
      // hiển thị ra giao diện
      // res.redirect('/admin/categories/')
    })
    .catch((error) => console.error("Error:", error));
};


// GET /admin/categories/delete/:category_id (thực hiện xoá)
exports.delete = (req, res, next) => {
  // gọi api
  let category_id = req.params.category_id;
  fetch(`http:/localhost:3000/api/categories/${category_id}`, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
  })
    .then((response) => response.json())
    .then((data) => {
      // res.send(data)
      if (data.result.affectedRows) {
        res.redirect("/admin/categories");
      } else {
        res.send("Lỗi không thể xoá");
      }
      // hiển thị ra giao diện
      // res.redirect('/admin/categories/')
    })
    .catch((error) => console.error("Error:", error));
};
