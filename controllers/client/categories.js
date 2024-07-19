exports.list = async (req, res, next) => {
    // gọi api
    const user = req.session.user;
    fetch("http:/localhost:3000/api/categories/")
      .then((response) => response.json())
      .then((data) => {
        // res.send(data)
        // hiển thị ra giao diện
        res.render("client/layout/header", {
            categories: data.data,
          user:user
        });
      })
      .catch((error) => console.error("Error:", error));
  };