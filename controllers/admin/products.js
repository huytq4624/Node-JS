
// ****API
const product = require("../../models/products");
//  hiển thị danh sách danh mục
exports.list = async (req, res, next) => {
    // gọi api

    fetch("http:/localhost:3000/api/products/")
    .then((response) => response.json())
    .then((data) => {
      // res.send(data)
      // hiển thị ra giao diện
      res.render("admin/product/list-product", {
        products: data.data,
       });
    })
    .catch((error) => console.error("Error:", error));
};

// hiển thị form thêm
exports.create = (req, res, next) => {
  fetch("http:/localhost:3000/api/categories/")
    .then((response) => response.json())
    .then((data) => {
      // res.send(data)
      // hiển thị ra giao diện
      res.render("admin/product/add-product", {
        categories: data.data,
      });
    })
    .catch((error) => console.error("Error:", error));
};


// thực hiện thêm
exports.store = async (req, res, next) => {
  // gọi api
 
  const file = req.file;
  let name = req.body.name;
  let price = req.body.price;
  let description = req.body.description;
  let category_id	= req.body.category_id;

  // bắt lỗi danh mục rỗng
  if ( !name || !price || !description || !file) {
    res.locals.error_name = "Tên sản phẩm không được để trống";
    res.locals.error_price = "Đơn giá không được để trống";
    res.locals.error_description = "Mô tả không được để trống";
    res.locals.error_image = "Ảnh không được để trống";
    return res.render('admin/product/add-product', { 
        categories: [],
        error: res.locals.error_name , 
        error: res.locals.error_price, 
        error: res.locals.error_description , 
        error: res.locals.error_price,
        error: res.locals.error_image,
     });
     
  }
 
  let users = {
    name: name,
    price:price,
    description: description,
    category_id:category_id,
    image:file.filename
  };
  fetch("http:/localhost:3000/api/products/", {
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
        res.redirect("/admin/products");
      } else {
        res.send("Lỗi không thể thêm");
      }
      // hiển thị ra giao diện
      // res.redirect('/admin/categories/')
    })
    .catch((error) => console.error("Error:", error));
};

  

//  (hiển thị form chỉnh sửa)
exports.detail = async (req, res, next) => {
  let product_id = req.params.product_id;
  try {
    const [productsResponse, categoriesResponse] = await Promise.all([
      fetch(`http://localhost:3000/api/products/${product_id}`).then(response => response.json()),
      fetch("http://localhost:3000/api/categories/").then(response => response.json())
    ]);

    const productsData = productsResponse.data[0];
    const categoriesData = categoriesResponse.data;

    // Render data to the client index template
    res.render("admin/product/edit-product", {
      categories: categoriesData,
      products: productsData
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
};

//  (thực hiện cập nhật)
exports.update = async (req, res, next) => {
  // gọi api
  let product_id = req.params.product_id;

  const file = req.file;
  let name = req.body.name;
  let price = req.body.price;
  let description = req.body.description;
  let category_id	= req.body.category_id;
   
  let users = {
    name: name,
    price:price,
    description: description,
    category_id	 :category_id,
    image:file.filename
  };
  // res.send(req.body)
  fetch(`http:/localhost:3000/api/products/${product_id}`, {
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
        res.redirect("/admin/products");
      } else {
      }
   
    })
    .catch((error) => console.error("Error:", error));
};


// GET /admin/categories/delete/:category_id (thực hiện xoá)
exports.delete = (req, res, next) => {
  // gọi api
  let product_id = req.params.product_id;
  fetch(`http:/localhost:3000/api/products/${product_id}`, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
  })
    .then((response) => response.json())
    .then((data) => {
      // res.send(data)
      if (data.result.affectedRows) {
        res.redirect("/admin/products");
      } else {
        res.send("Lỗi không thể xoá");
      }
      // hiển thị ra giao diện
      // res.redirect('/admin/categories/')
    })
    .catch((error) => console.error("Error:", error));
};


