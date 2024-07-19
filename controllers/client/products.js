
exports.list = async (req, res, next) => {
  try {
    const [productsResponse, categoriesResponse] = await Promise.all([
      fetch("http://localhost:3000/api/products/").then(response => response.json()),
      fetch("http://localhost:3000/api/categories/").then(response => response.json())
    ]);

    const productsData = productsResponse.data;
    const categoriesData = categoriesResponse.data;
    const user = req.session.user;
    // Render data to the client index template
    res.render("client/product/product", {
      categories: categoriesData,
      products: productsData,
      user:user
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
};

exports.detail = async (req, res, next) => {
  let product_id = req.params.product_id;
  try {
    const [productsResponse, categoriesResponse] = await Promise.all([
      fetch(`http://localhost:3000/api/products/${product_id}`).then(response => response.json()),
      fetch("http://localhost:3000/api/categories/").then(response => response.json())
    ]);

    const productsData = productsResponse.data[0];
    const categoriesData = categoriesResponse.data;
    const user = req.session.user;

    // Render data to the client index template
    res.render("client/product/detail", {
      categories: categoriesData,
      products: productsData,
      user:user
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
};

exports.edit = (req, res, next) => {
  // gọi api
  let products_id = req.params.product_id;
  const user = req.session.user;
  fetch(`http:/localhost:3000/api/products/${products_id}`)
    .then((response) => response.json())
    .then((data) => {
      // res.send(data)
      // hiển thị ra giao diện
      res.render("client/product/product", {
        products: data.data[0],
        user:user
      });
    })
    .catch((error) => console.error("Error:", error));
};

exports.cart = async (req, res, next) => {
  // gọi api
  try {
    const [productsResponse, categoriesResponse] = await Promise.all([
      fetch("http://localhost:3000/api/products/").then(response => response.json()),
      fetch("http://localhost:3000/api/categories/").then(response => response.json())
    ]);

    const productsData = productsResponse.data;
    const categoriesData = categoriesResponse.data;
    const user = req.session.user;
    const cart = req.session.cart || [];

    // Render data to the client index template
    res.render("client/cart/cart", {
      categories: categoriesData,
      products: productsData,
      user:user,
      cart: cart 
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
};

exports.listProCate = async (req, res, next) => {
  const category_id = req.params.category_id;
  try {
    const [productsResponse, categoriesResponse] = await Promise.all([
      fetch(`http:/localhost:3000/api/products/categories/${category_id}`).then(response => response.json()),
      fetch("http://localhost:3000/api/categories/").then(response => response.json())
    ]);

    const productsData = productsResponse.data;
    const categoriesData = categoriesResponse.data;
    const user = req.session.user;
    // Render data to the client index template
    res.render("client/product/product_cate", {
      categories: categoriesData,
      products: productsData,
       user :user
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
};