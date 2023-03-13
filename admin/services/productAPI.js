const URL = "https://640acb7a65d3a01f98076160.mockapi.io/products";

async function apiGetProducts(searchValue) {
   return await axios({
    method: "GET",
    url: URL,
    params: {
      name: searchValue || undefined,
    },
  });
}

async function apiCreateProduct(product) {
  return await axios({
    method: "POST",
    url: URL,
    data: product,
  });
}

function apiDeleteProduct(productId) {
  return axios({
    method: "DELETE",
    url: `${URL}/${productId}`,
  });
}

function apiGetProductById(productId) {
  return axios({
    method: "GET",
    url: `${URL}/${productId}`,
  });
}

async function apiUpdateProduct(productId, product) {
  return await axios({
    method: "PUT",
    url: `${URL}/${productId}`,
    data: product,
  });
}
