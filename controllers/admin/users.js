
// ****API
const user = require("../../models/users");
exports.list = async (req, res, next) => {
  // gọi api
  fetch("http:/localhost:3000/api/users/")
    .then((response) => response.json())
    .then((data) => {
      // hiển thị ra giao diện
      res.render("admin/accout/staff", {
        users: data.data,
      });
    })
    .catch((error) => console.error("Error:", error));
};

//  (hiển thị form thêm)
exports.create = (req, res, next) => {
  res.render("admin/accout/add-staff");
};
exports.Formlogin = (req, res, next) => {
  res.render("admin/users/login");
};



//  (thực hiện thêm)
exports.store = async (req, res, next) => {
  // gọi api
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  let name = req.body.name;
  let role = req.body.role;
  
  let confirmPassword = req.body.confirmPassword;
  if (!username || !email || !password || !name ) {
    res.locals.error_email = "Email không được để trống";
    res.locals.error_username = "Tên đăng nhập không được để trống";
    res.locals.error_password = "Mật khẩu không được để trống";
    res.locals.error_name = "Họ và tên không được để trống";
    res.locals.error_confirmPassword = "Mật khẩu xác nhận không khớp với mật khẩu đã nhập";
   
    return res.render('admin/accout/add-staff', { 
        error: res.locals.error_username,
        error: res.locals.error_name , 
        error: res.locals.error_password ,
        error: res.locals.error_email ,
        error: res.locals.error_confirmPassword
     });
     
  }
  const emailExists = await user.checkEmailExists(email);
  const usernameExists = await user.checkUsernamelExists(username);
  if (emailExists || usernameExists) {
    res.locals.error_username = "Tài khoản đã tồn tại";
    res.locals.error_email = "Email đã tồn tại";
    return res.render('admin/accout/add-staff', { 
      error_email: res.locals.error_email,
      error_username: res.locals.error_username
    });
  }
 

  let users = {
    name: name,
    password: confirmPassword,
    email: email,
    username: username,
    role: role,
  };
  fetch("http:/localhost:3000/api/users/", {
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
        res.redirect("/admin/users/");
      } else {
        res.send("Lỗi không thể thêm");
      }
      // hiển thị ra giao diện
      // res.redirect('/admin/categories/')
    })
    .catch((error) => console.error("Error:", error));
};
// exports.login = async (req, res, next) => {
//     // Lấy thông tin username và password từ request body
//     let username = req.body.username;
//     let password = req.body.password;
  
//     // Kiểm tra xem username và password có được nhập hay không
//     if (!username || !password) {
//       res.locals.error_username = "Tên đăng nhập không được để trống";
//       res.locals.error_password = "Mật khẩu không được để trống";
  
//       return res.render('admin/users/login', { 
//         error_username: res.locals.error_username,
//         error_password: res.locals.error_password
//       });
//     }
  
//     // Kiểm tra đăng nhập bằng hàm checkLogin từ module user
//     const usernameExists = await user.checkLogin(username, password);
//     if (!usernameExists) {
//       // Nếu tài khoản không tồn tại hoặc mật khẩu không hợp lệ, hiển thị thông báo lỗi
//       res.locals.error_username = "Tài khoản không tồn tại hoặc mật khẩu không hợp lệ";
//       return res.render('admin/users/login', { 
//         error_username: res.locals.error_username
//       });
//     }
//     // }else{
//     //     return res.redirect("/admin/users/");
//     // }
//     try {
//       // Gửi request POST đến API để kiểm tra thông tin đăng nhập
//       const response = await fetch("http://localhost:3000/api/users/login", {
//         method: "POST", // Phương thức POST để kiểm tra thông tin đăng nhập
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username: username, password: password }), // Gửi username và password trong request body
//       });
  
//       const data = await response.json(); // Parse dữ liệu nhận được từ response
  
//       // Kiểm tra kết quả từ API
//       if (data.result === 1) {
//         // Nếu thông tin đăng nhập hợp lệ, redirect đến trang quản lý người dùng

//         res.redirect("/admin/users/");
//       } else {
//         // Nếu thông tin đăng nhập không hợp lệ, hiển thị thông báo lỗi
//         res.send("Thông tin đăng nhập không đúng");
     
//       }
//     } catch (error) {
//       // Xử lý lỗi nếu có
//       console.error("Error:", error);
//       res.status(500).send("Đã xảy ra lỗi khi đăng nhập");
//     }
//   };
  

// hiển thị form chỉnh sửa
exports.edit = (req, res, next) => {
  // gọi api
  let user_id = req.params.user_id;
  fetch(`http:/localhost:3000/api/users/${user_id}`)
    .then((response) => response.json())
    .then((data) => {
      // res.send(data)
      // hiển thị ra giao diện
      res.render("admin/accout/edit-staff", {
        user: data.data[0],
      });
    })
    .catch((error) => console.error("Error:", error));
};

//thực hiện cập nhật
exports.update = async (req, res, next) => {
  // gọi api
  let user_id = req.params.user_id;
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  let name = req.body.name;
  let role = req.body.role;

  let users = {
    name: name,
    password: password,
    email: email,
    username: username,
    role: role,
  };

  // res.send(req.body)
  fetch(`http:/localhost:3000/api/users/${user_id}`, {
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
        res.redirect("/admin/users/");
      } else {
        res.send("Lỗi không thể cập nhật");
      }
      // hiển thị ra giao diện
      // res.redirect('/admin/categories/')
    })
    .catch((error) => console.error("Error:", error));
};

// thực hiện xoá
exports.delete = (req, res, next) => {
  // gọi api
  let user_id = req.params.user_id;
  fetch(`http:/localhost:3000/api/users/${user_id}`, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
  })
    .then((response) => response.json())
    .then((data) => {
      // res.send(data)
      if (data.result.affectedRows) {
        res.redirect("/admin/users/");
      } else {
        res.send("Lỗi không thể xoá");
      }
    })
    .catch((error) => console.error("Error:", error));
};
