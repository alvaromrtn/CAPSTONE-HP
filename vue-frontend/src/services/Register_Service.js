import axios from "axios";

const ENDPOINT_API_BASE_URL = "http://localhost:8080/api/routes/register";

class Register_Service {
  getRegister(user) {
    return axios.post(ENDPOINT_API_BASE_URL, user);
  }
}

export default new Register_Service();
