var db = require("./db");
module.exports = class Category {
  constructor() {}
  // lay tat ca loai
  static async getAll() {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM users`;
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
  static async getById(user_id) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM users WHERE user_id=${user_id}`;
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
      db.query("INSERT INTO users SET ? ", users, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  //đăng nhập
  static async login(username) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE username = '${username}'`,
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

  //xóa theo id
  static async delete(user_id) {
    return new Promise((resolve, reject) => {
      let sql = `DELETE FROM users WHERE user_id= ${user_id}`;
      db.query(sql, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  //check email tồn tại
  static async checkEmailExists(email) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT COUNT(*) AS count FROM users WHERE email = ?",
        [email],
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
  //check username tồn tại
  static async checkUsernamelExists(username) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT COUNT(*) AS count FROM users WHERE username = ?",
        [username],
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

  //check đăng nhập
  static async checkLogin(username) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE username = ?",
        [username],
        (error, results, fields) => {
          if (error) {
            reject(error);
          } else {
            if (results && results.length > 0) {
              resolve(true);
            } else {
              resolve(false);
            }
          }
        }
      );
    });
  }
  //kiểm tra password theo username
  static async getHashedPassword(username) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT password FROM users WHERE username = ?",
        [username],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          if (results.length === 0) {
            return reject(new Error("User not found"));
          }
          resolve(results[0].password);
        }
      );
    });
  }
  //cập nhật sản phẩm theo id
  static async update(user, users_id) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE users SET ? WHERE user_id=?",
        [user, users_id],
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
