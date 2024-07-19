var db = require("./db");
module.exports = class Category {
  constructor() {}
  // lay tat ca loai san pham
  static async getAll() {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM categories`;
      db.query(sql, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  //lấy theo id
  static async getById(category_id) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM categories WHERE category_id = ${category_id}`;
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
  static async create(users) {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO categories SET ? ", users, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  //xóa theo id
  static async delete(category_id) {
    return new Promise((resolve, reject) => {
      let sql = `DELETE FROM categories WHERE category_id = ${category_id}`;
      db.query(sql, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  //cập nhật theo id
  static async update(category, category_id) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE categories SET ? WHERE category_id=?",
        [category, category_id],
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
  //check danh mục có tồn tại
  static async checkNameCate(name) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT COUNT(*) AS count FROM categories WHERE name = ?",
        [name],
        (error, results, fields) => {
          if (error) {
            reject(error);
          } else {
            resolve(results[0].count > 0);
          }
        }
      );
    });
  }
};
