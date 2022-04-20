import axios from "axios";

const ENDPOINT_API_BASE_URL = "http://localhost:8080/api/routes/endpoint";

class Endpoint_Service {
  getEndpoint() {
    return axios.get(ENDPOINT_API_BASE_URL);
  }
}

export default new Endpoint_Service();
