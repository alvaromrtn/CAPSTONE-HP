import axios from "axios";

const ESPERANZAVIDA_API_BASE_URL =
  "http://localhost:8080/api/routes/esperanza_de_vida";

class EsperanzaVida_Service {
  getEsperanzaVida() {
    return axios.get(ESPERANZAVIDA_API_BASE_URL);
  }
}

export default new EsperanzaVida_Service();
