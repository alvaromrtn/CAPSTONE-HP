import axios from "axios";

const PROFILE_API_BASE_URL = "http://localhost:8080/api/routes/profile";
const CHANGEDATA_API_BASE_URL = "http://localhost:8080/api/routes/changeData";
const DELETEUSER_API_BASE_URL = "http://localhost:8080/api/routes/";

const PAGINA_LOGIN = "http://localhost:8081/login";

class Profile_Service {
  getData() {
    return axios.get(PROFILE_API_BASE_URL).catch(function (error) {
      if (error.response) {
        // Solicitud realizada, servidor responde:
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

        window.location.href = PAGINA_LOGIN;
      } else {
        // Otro error:
        console.log("ERROR: ", error.message);

        window.location.href = PAGINA_LOGIN;
      }
    });
  }
  sendData(user) {
    return axios.post(CHANGEDATA_API_BASE_URL, user);
  }
  deleteUser(id) {
    return axios.delete(DELETEUSER_API_BASE_URL + id);
  }
}

export default new Profile_Service();
