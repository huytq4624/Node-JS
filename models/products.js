var db = require("./db");
module.exports = class Produtc {
  constructor() {}
  // lay tat ca loai san pham
  static async getAll() {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM products`;
      db.query(sql, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  // lấy theo id
  static async getById(product_id) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM products WHERE product_id = ${product_id}`;
      db.query(sql, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  //thêm mới
  static async create(products) {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO products SET ? ", products, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  //lấy sản phẩm theo category_id
  static async loadProCate(category_id) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM products WHERE category_id = ${category_id} `,
        [category_id],
        function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }

  //xóa sản phẩm theo id
  static async delete(product_id) {
    return new Promise((resolve, reject) => {
      let sql = `DELETE FROM products WHERE product_id = ${product_id}`;
      db.query(sql, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  //cập nhật sản phẩm theo id
  static async update(product, product_id) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE products SET ? WHERE product_id=?",
        [product, product_id],
        function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }
};
