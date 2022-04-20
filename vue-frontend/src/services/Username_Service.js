import axios from "axios";

const USERNAME_API_BASE_URL = "http://localhost:8080/api/routes/username";

class Username_Service {
  getUsername() {
    return axios.get(USERNAME_API_BASE_URL);
  }
}

export default new Username_Service();
