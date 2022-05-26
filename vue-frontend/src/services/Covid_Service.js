import axios from "axios";

const CASOS_API_BASE_URL = "http://localhost:8080/api/routes/covid/casos/";
const MUERTES_API_BASE_URL = "http://localhost:8080/api/routes/covid/muertes/";
const TESTS_API_BASE_URL = "http://localhost:8080/api/routes/covid/tests/";

const PAGINA_LOGIN = "http://localhost:8081/login";

class Covid_Service {
  getCasos(estado) {
    estado = "ca";
    return axios.get(CASOS_API_BASE_URL + estado).catch(function (error) {
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
  getMuertes(estado) {
    estado = "ca";
    return axios.get(MUERTES_API_BASE_URL + estado).catch(function (error) {
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
  getTests(estado) {
    estado = "ca";
    return axios.get(TESTS_API_BASE_URL + estado).catch(function (error) {
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
}

export default new Covid_Service();
