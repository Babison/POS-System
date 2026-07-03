import axios from "axios";

const API = "http://localhost:5000/api";

export default {
  getProducts() {
    return axios.get(`${API}/products`);
  },

  createSale(data) {
    return axios.post(
      `${API}/sales`,
      data
    );
  },
};