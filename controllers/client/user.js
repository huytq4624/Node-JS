
// ****API
const user = require("../../models/users");
const products = require("../../models/products");
const bcrypt = require('bcrypt');

//  (hiển thị form đăng kí)
exports.signup= async (req, res, next) => {
    res.render('client/login/signup');
  
  };
//  (hiển thị form đăng nhập)

exports.loginF= async (req, res, next) => {
    res.render('client/login/login');
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
   
    return res.render('client/login/signup', { 
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
    return res.render('client/login/signup', { 
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
  fetch("http:/localhost:3000/api/signup/", {
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
        res.redirect("/client/login");
      } else {
        res.send("Lỗi không thể thêm");
      }
      // hiển thị ra giao diện
      // res.redirect('/admin/categories/')
    })
    .catch((error) => console.error("Error:", error));
};

exports.login = async (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    req.session.user = {
        username: username,
        password: password,
    }
    if (!username || !password ) {
        res.locals.error_username = "Tên đăng nhập không được để trống";
        res.locals.error_password = "Mật khẩu không được để trống";
        return res.render('client/login/login', { 
            error: res.locals.error_username,
            error: res.locals.error_password ,
         });
      }
      const usernameExists = await user.checkLogin(username);
      if (!usernameExists) {
        // Nếu tài khoản không tồn tại hoặc mật khẩu không hợp lệ, hiển thị thông báo lỗi
        res.locals.error_username = "Tài khoản không tồn tại hoặc mật khẩu không hợp lệ";
        return res.render('client/login/login', { 
          error_username: res.locals.error_username
        });
      }
    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.session.user),
        });

        if (response.ok) {
            const data = await response.json();
            if (data && data.data) {
                console.log(data.data);
                const userData = data.data[0]; 
                let hashPasswordDB = userData.password;

                // So sánh mật khẩu đã nhập với mật khẩu đã được mã hóa trong cơ sở dữ liệu bằng bcrypt
                const isPasswordMatch = await bcrypt.compare(password, hashPasswordDB);
                
                if (isPasswordMatch) {
                    res.redirect('/client');
                } else {
                    console.log('Mật khẩu không đúng');
                    res.status(401).json({ error: 'Mật khẩu không đúng' });
                }
            } else {
                console.log('Tên người dùng không tồn tại');
                res.status(404).json({ error: 'Tên người dùng không tồn tại' });
            }
        } else {
            console.error('Lỗi khi đăng nhập:', response.statusText);
            res.status(500).json({ error: 'Đã có lỗi xảy ra khi đăng nhập.' });
        }
    } catch (error) {
        console.error('Lỗi khi đăng nhập:', error);
        res.status(500).json({ error: 'Đã có lỗi xảy ra khi đăng nhập.' });
    }
}

exports.logout = (req, res, next) =>{
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        } else {
            res.redirect('/client');
        }
    });
}

exports.addCart = (req, res, next) =>{
    const productId = req.body.product_id;
    // Lấy thông tin sản phẩm từ cơ sở dữ liệu (hoặc từ nơi nào đó)
    const product = products.getById(productId);
console.log(product);
    // Kiểm tra xem session giỏ hàng đã tồn tại chưa
    if (!req.session.cart) {
        // Nếu chưa, tạo giỏ hàng mới
        req.session.cart = [];
    }

    // Thêm sản phẩm vào giỏ hàng trong session
    req.session.cart.push(product);

    // Chuyển hướng hoặc hiển thị thông báo thành công
    res.redirect('/client/products/card'); 
}
  





