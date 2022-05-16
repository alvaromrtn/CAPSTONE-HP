import axios from "axios";
import Cookies from "js-cookie";

const PROFILE_API_BASE_URL = "http://localhost:8080/api/routes/profile";
const CHANGEDATA_API_BASE_URL = "http://localhost:8080/api/routes/changeData";

class Profile_Service {
  getData() {
    console.log("COOKIE SERVICE: " + Cookies.get("userLogged"));
    let prueba = {};
    prueba.token = Cookies.get("userLogged");
    Cookies.get("userLogged");
    return axios.post(PROFILE_API_BASE_URL, prueba);
  }
  sendData(user) {
    return axios.post(CHANGEDATA_API_BASE_URL, user);
  }
}

export default new Profile_Service();
