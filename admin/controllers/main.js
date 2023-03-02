//Hàm gửi yêu cầu lấy danh sách sản phẩm từ API
function getProducts(searchValue) {
  apiGetProducts()
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
      renderProducts(products);
      console.log(response.data);
    })
    .catch((error) => {
      //callAPI thất bại
      alert("API get products error");
    });
}

//Hàm thêm sản phẩm : DOM và gửi yêu cầu thêm sản phẩm tới API
function createProduct() {
  const product = {
    name: getElement("#name").value,
    price: getElement("#price").value,
    screen: getElement("#screen").value,
    backCamera: getElement("#backCamera").value,
    frontCamera: getElement("#frontCamera").value,
    img: getElement("#image").value,
    description: getElement("#description").value,
    type: getElement("#type").value,
  };

  apiCreateProduct(product)
    .then((respone) => {
      getProducts();
    })
    .catch((error) => {
      alert("Thêm sản phẩm thất bại");
    });
}

//Hàm xóa sản phẩm
function deleteProduct(productId) {
  apiDeleteProduct(productId)
    .then((respone) => {
      getProducts();
    })
    .catch((error) => {
      alert("Xóa sản phẩm thất bại");
    });
}

//Hàm lấy chi tiết của 1 sản phẩm và hiển thị ra modal
function selectProduct(productId) {
  apiGetProductById(productId)
    .then((respone) => {
      const product = respone.data;
      getElement("#name").value = product.name;
      getElement("#price").value = product.price;
      getElement("#screen").value = product.screen;
      getElement("#backCamera").value = product.backCamera;
      getElement("#frontCamera").value = product.frontCamera;
      getElement("#image").value = product.img;
      getElement("#description").value = product.description;
      getElement("#type").value = product.type;

      //Mở và cập nhật  lại giao diện cho modal
      getElement(".modal-footer").innerHTML = `
    <button class="btn btn-warning" data-dismiss="modal" onclick="updateProduct('${product.id}')">Update Phone</button>
    <button class="btn btn-secondary" data-dismiss="modal">Close</button>
    `;
      $("#myModal").modal("show");
    })
    .catch((error) => {
      alert("Lấy chi tiết sản phẩm thất bại");
    });
}

//Hàm cập nhật sản phẩm
function updateProduct(productId) {
  const product = {
    name: getElement("#name").value,
    price: getElement("#price").value,
    screen: getElement("#screen").value,
    backCamera: getElement("#backCamera").value,
    frontCamera: getElement("#frontCamera").value,
    img: getElement("#image").value,
    description: getElement("#description").value,
    type: getElement("#type").value,
  };
  apiUpdateProduct(productId, product)
    .then((respone) => {
      getProducts();
    })
    .catch((error) => {
      alert("Cập nhật sản phẩm thất bại");
    });
}

//Hàm hiển thị danh sách sản phẩm ra table
function renderProducts(products) {
  let html = products.reduce((result, product, index) => {
    return (
      result +
      `
      <tr>
      <td>${index + 1}</td>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td style="text-align: center">
      <img scr="${product.img}" width="79" height="79">
      </td>
      <td>${product.description}</td>
      <td>
      <button class="btn btn-primary" onclick="selectProduct('${
        product.id
      }')">Edit<i class="fa fa-edit"></i></button>
      <button class="btn btn-danger" onclick="deleteProduct('${
        product.id
      }')">Delete</button>
      </td>
      </tr>
    `
    );
  }, "");
  document.getElementById("tblDanhSachSP").innerHTML = html;
}

getProducts();

//==========DOM=========
getElement("#btnThemSP").addEventListener("click", () => {
  getElement(".modal-footer").innerHTML = `
  <button class="btn btn-primary" onclick="createProduct()" data-dismiss="modal">Add Phone</button>
  <button class="btn btn-warning" data-dismiss="modal">Close</button> 
  `;
});

getElement("#txtSearch").addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;

  const searchValue = event.target.value;
  getProducts(searchValue);
});

//=========Helpers==========
function getElement(selector) {
  return document.querySelector(selector);
}
