import axios from "axios";
import router from '../router'

const LOGIN_API_BASE_URL = "http://localhost:8080/api/routes/login";

class Login_Service {
  getLogin(user) {
<<<<<<< HEAD
    return axios.post(ENDPOINT_API_BASE_URL, user).then((res) => {
      if (res.status === 200) {
        console.log("hola buenas tardes"+res.data.token)
        //axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token
        router.push({
          name: 'esperanza_de_vida'
        })
        //var ruta = "/esperanza_de_vida";
        //window.location.href = ruta;
      } else if(res.status === 500 || res.status===401){
        console.log(res)
        this.$router.push({
        name: 'Login'
          })
      }
=======
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
>>>>>>> b72d10271c40aba7cb8e7ced685ef4dfb3c2433d
    });
  }
}

export default new Login_Service();
