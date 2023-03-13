export class Service {
    getPhones = async () => {
      try {
        const res = await axios({
          url: 'https://640acb7a65d3a01f98076160.mockapi.io/products',
          method: 'GET',
        });
        return res.data;
      } catch (err) {
        console.log(err);
      }
    };
    getPhoneById = async (id) => {
      try {
        const res = await axios({
          url: `https://640acb7a65d3a01f98076160.mockapi.io/products/${id}`,
          method: 'GET',
        });
  
        return res.data;
      } catch (err) {
        console.log(err);
      }
    };
  }
  