import axios from "axios";

const MUERTES_API_BASE_URL = "http://localhost:8080/api/routes/covid/casos/";

class Covid_Service {
  getCasos(estado) {
    console.log(estado);
    estado = "ca";
    return axios.get(MUERTES_API_BASE_URL + estado);
  }
}

export default new Covid_Service();
