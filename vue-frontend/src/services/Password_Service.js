import axios from "axios";

const PASSWORD_API_BASE_URL = "http://localhost:8080/api/routes/password";

class Password_Service {
  getPassword() {
    return axios.get(PASSWORD_API_BASE_URL);
  }
}

export default new Password_Service();
