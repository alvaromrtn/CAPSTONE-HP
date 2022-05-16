import axios from "axios";

const PROFILE_API_BASE_URL = "http://localhost:8080/api/routes/profile";
const CHANGEDATA_API_BASE_URL = "http://localhost:8080/api/routes/changeData";

class Profile_Service {
  getData() {
    return axios.get(PROFILE_API_BASE_URL);
  }
  sendData(user) {
    return axios.post(CHANGEDATA_API_BASE_URL, user);
  }
}

export default new Profile_Service();
