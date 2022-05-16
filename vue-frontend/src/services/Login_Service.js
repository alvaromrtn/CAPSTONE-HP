import axios from "axios";
import router from '../router'

const ENDPOINT_API_BASE_URL = "http://localhost:8080/api/routes/login";

class Login_Service {
  getLogin(user) {
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
    });
  }
}

export default new Login_Service();
