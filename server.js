const express = require("express");
const session = require('express-session');// thư viện session
var bodyParser = require("body-parser"); //xử lý dữ liệu đến từ người dùng
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.static("accsets")); // chỉ định thư mục gốc
app.use(bodyParser.urlencoded({
  extended: true
}))
// Thiết lập session middleware
app.use(session({
  secret: 'your-secret-key', // Chuỗi bí mật để ký và mã hóa session ID
  resave: false, // Không lưu lại session nếu không có sự thay đổi
  saveUninitialized: false // Không lưu session nếu không có dữ liệu được đặt
}));

//xử lý dữ liệu được gửi đến server
app.set(`view engine`, `ejs`);

app.get("/shop", (req, res) => {
  res.render(`index`);
});
const clientRoutes = require('./routes/client');
app.use('/client', clientRoutes);

const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);

const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);


app.listen(port, () => {
  console.log(`Ứng dụng đang chạy với port: ${port}`);
});
