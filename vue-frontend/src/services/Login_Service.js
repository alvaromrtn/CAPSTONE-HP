import axios from "axios";

const LOGIN_API_BASE_URL = "http://localhost:8080/api/routes/login";

class Login_Service {
  getLogin(user) {
    console.log(user);
    return axios.post(LOGIN_API_BASE_URL, user).then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        //this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token
        console.log("CORRECTO");
      }
      /*
        else if (res.status === 500 || res.status === 401) {
          console.log(res);
          this.$router.push({
            name: "Login",
          });
        }
      */
    });
  }
}

export default new Login_Service();
