//Hàm gửi yêu cầu lấy danh sách sản phẩm từ API
function getProducts() {
  axios({
    method: "GET",
    url: "https://63f70b96e40e087c95866863.mockapi.io/api/N10/products",
  })
    .then((response) => {
      //Call API thành công
      const products = response.data.map((product) => {
        return new Product(
          product.id,
          product.name,
          product.price,
          product.screen,
          product.backCamera,
          product.frontCamera,
          product.img,
          product.description,
          product.type
        );
      });
      console.log(response.data);
    })
    .catch((error) => {
      //callAPI thất bại
      alert("API get products error");
    });
}
getProducts();

//=========Helpers==========
function getElement(selector) {
  return document.querySelector(selector);
}
