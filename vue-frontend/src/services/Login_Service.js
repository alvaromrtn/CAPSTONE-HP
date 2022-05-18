import axios from "axios";
import router from "../router";

const LOGIN_API_BASE_URL = "http://localhost:8080/api/routes/login";

class Login_Service {
  getLogin(user) {
    console.log(user);
    return axios.post(LOGIN_API_BASE_URL, user).then((response) => {
      if (response.status === 200) {
        axios.defaults.headers.common["Authorization"] ="Bearer " + response.data.token;
        router.push({
          name: "esperanza_de_vida",
        });
      } else if (response.status === 500 || response.status === 401) {
        console.log(response);
        this.$router.push({
          name: "Login",
        });
      }
    });
  }
}

export default new Login_Service();
