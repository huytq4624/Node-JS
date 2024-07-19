
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
    res.render("client/index", {
      categories: categoriesData,
      products: productsData,
      user:user
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
};

exports.contact= async (req, res, next) => {
  try {
    const [productsResponse, categoriesResponse] = await Promise.all([
      fetch("http://localhost:3000/api/products/").then(response => response.json()),
      fetch("http://localhost:3000/api/categories/").then(response => response.json())
    ]);

    const productsData = productsResponse.data;
    const categoriesData = categoriesResponse.data;
    const user = req.session.user;
    // Render data to the client index template
    res.render('client/contact/contact', {
      categories: categoriesData,
      products: productsData,
      user:user
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
};
exports.login= async (req, res, next) => {

    res.render('client/login/login');

};
exports.signup= async (req, res, next) => {

  res.render('client/login/signup');

};


