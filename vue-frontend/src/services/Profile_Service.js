import axios from "axios";
import Cookies from "js-cookie";

const PROFILE_API_BASE_URL = "http://localhost:8080/api/routes/profile";
const CHANGEDATA_API_BASE_URL = "http://localhost:8080/api/routes/changeData";
const DELETEUSER_API_BASE_URL = "http://localhost:8080/api/routes/";

class Profile_Service {
  getData() {
    let cookie = {};
    cookie.token = Cookies.get("userLogged");
    return axios.post(PROFILE_API_BASE_URL, cookie);
  }
  sendData(user) {
    return axios.post(CHANGEDATA_API_BASE_URL, user);
  }
  deleteUser(id) {
    return axios.delete(DELETEUSER_API_BASE_URL + id);
  }
}

export default new Profile_Service();
