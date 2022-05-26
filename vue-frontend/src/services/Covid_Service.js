import axios from "axios";

const CASOS_API_BASE_URL = "http://localhost:8080/api/routes/covid/casos/";
const MUERTES_API_BASE_URL = "http://localhost:8080/api/routes/covid/muertes/";
const TESTS_API_BASE_URL = "http://localhost:8080/api/routes/covid/tests/";

class Covid_Service {
  getCasos(estado) {
    console.log(estado);
    estado = "ca";
    return axios.get(CASOS_API_BASE_URL + estado);
  }
  getMuertes(estado) {
    console.log(estado);
    estado = "ca";
    return axios.get(MUERTES_API_BASE_URL + estado);
  }
  getTests(estado) {
    console.log(estado);
    estado = "ca";
    return axios.get(TESTS_API_BASE_URL + estado);
  }
}

export default new Covid_Service();
