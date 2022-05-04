import axios from "axios";

const ENDPOINT_API_BASE_URL = "http://localhost:8080/api/routes/register";

class Register_Service {
  getRegister(user) {
    console.log(user);

    return axios.post(ENDPOINT_API_BASE_URL, user).then((response) => {
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

export default new Register_Service();
