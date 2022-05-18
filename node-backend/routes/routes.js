const router = require("express").Router();
const User = require("../model/User");
const service = require("../config/service");
const axios = require("axios");
var jwt = require("jwt-simple");
const config= require('../config/token')
const moment = require("moment");

//HOME:
router.get("/", async (request, response) => {
  res.json("HOME");
});

//LOGIN:
router.post("/login", async (request, response) => {
  await User.findOne({ email: request.body.email }, async (error, user) => {
    const match = await user.matchPassword(request.body.password);
    console.log(match);
    if (!match) {
      return response.status(401).json({
        title: "La contraseña no coincide",
        error: "Datos incorrectos",
      });
    } else {
      return response.status(200).send({ token: service.createToken(user) });
    }
  }).clone();
});

//REGISTER:
router.post("/register", async (request, response) => {
  const { name, lastName, email, password, confirm_password } = request.body;

  const emailUser = await User.findOne({ email: email });

  if (emailUser) {
    response.json({
      title: "El usuario ya existe",
      status: 401,
    });
  }
  const newUser = new User({ name, lastName, email, password });
  newUser.password = await newUser.encryptPassword(password);
  console.log(newUser.password);
  await newUser.save(function (err) {
    return response.json({
      title: "Usuario registrado",
      status: 200,
    });
  });
});

//PROFILE:
router.post("/profile", async (request, response) => {
  console.log("HEADERS: " + request.headers.authorization);
  console.log("COOKIES: " + request.body.token);

  if (!request.headers.authorization) {
    return response.status(403).json({
      title: "Tu petición no tiene cabecera de autorización.",
    });
  }

  var token = request.headers.authorization.split(" ")[1];
  var payload = jwt.decode(token.toString(),config.TOKEN_SECRET);
  //const email = "alvaro@gmail.com";
  var user = await User.findOne({ email: payload.sub }); //payload.sub
  console.log(user);
  
  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: "El token ha expirado" });
  }
  response.json(user);
});

//CHANGE_DATA:
router.post("/changeData", async (request, response) => {
  //Comprobamos la cabecera:
  if (!request.headers.authorization) {
    return response.status(403).json({
      title: "Tu petición no tiene cabecera de autorización.",
    });
  }
  var user = await User.findOneAndUpdate(
    { email: request.body.email },
    { name: request.body.name, lastName: request.body.lastName }
  );
  response.json(user);
});

//ESPERANZA_DE_VIDA:
router.get("/esperanza_de_vida", async (request, response) => {
  //Comprobamos la cabecera:
  console.log(request.headers.authorization)
  if (!request.headers.authorization) {
    return response.status(403).json({
      title: "Tu petición no tiene cabecera de autorización.",
    });
  }

  let paises = [
    {
      nombre: "Japón",
      general: 84.3,
      hombres: 81.5,
      mujeres: 86.9,
    },
    {
      nombre: "Suiza",
      general: 83.4,
      hombres: 81.8,
      mujeres: 85.1,
    },
    {
      nombre: "Corea del Sur",
      general: 83.3,
      hombres: 80.3,
      mujeres: 86.1,
    },
    {
      nombre: "España",
      general: 83.2,
      hombres: 80.7,
      mujeres: 85.7,
    },
    {
      nombre: "Singapur",
      general: 83.2,
      hombres: 81.0,
      mujeres: 85.5,
    },
    {
      nombre: "Chipre",
      general: 83.1,
      hombres: 81.8,
      mujeres: 85.1,
    },
  ];
  response.json(paises);
});

//BORRAR USUARIO:
router.delete("/:id", async (request, response) => {
  //Comprobamos la cabecera:
  if (!request.headers.authorization) {
    return response.status(403).json({
      title: "Tu petición no tiene cabecera de autorización.",
    });
  }
  console.log("Entro en la ruta de eliminar");
  //await User.findByIdAndRemove(request.params.id);
  response.json({
    status: "Usuario eliminado",
  });
});

///////API COVID///////////
//DATOS POR ESTADO (PARAMETRO) Y FECHA (A MANO) FORMATO AAAA/MM/DD ??
router.get("/covid/hoy/:estado", async (request, response) => {
  //const estado = req.params.estado;
  if (!request.headers.authorization) {
    return response.status(403).json({
      title: "Tu petición no tiene cabecera de autorización.",
    });
  }
  const estado = "ca";
  let dia = null;
  dia = await axios
    .get(`https://api.covidtracking.com/v1/states/${estado}/20200501.json`)
    .then((response) => {
      console.log("Fecha" + response.data.date);
      let dia1 = response.data;
      return dia1;
    });
  console.log(dia);
  return dia;
});

router.get("/covid/muertes/:estado", async (request, response) => {
  //
  //const estado = req.params.estado;
  if (!request.headers.authorization) {
    return response.status(403).json({
      title: "Tu petición no tiene cabecera de autorización.",
    });
  }
  const estado = "ca";
  let muertes = [];
  muertes = await axios
    .get(`https://api.covidtracking.com/v1/states/${estado}/daily.json`)
    .then((response) => {
      let muertes1 = [];
      response.data.forEach((dia) => {
        muertes1.push({ fecha: dia.date, muertes: dia.death });
      });
      return muertes1;
    });
  console.log(muertes);
  return muertes;
});

router.get("/covid/casos/:estado", async (request, response) => {
  //const estado = req.params.estado;
  if (!request.headers.authorization) {
    return response.status(403).json({
      title: "Tu petición no tiene cabecera de autorización.",
    });
  }
  const estado = "ca";
  let casos = [];
  casos = await axios
    .get(`https://api.covidtracking.com/v1/states/${estado}/daily.json`)
    .then((response) => {
      //console.log(response.data)
      let casos1 = [];
      response.data.forEach((dia) => {
        casos1.push({ fecha: dia.date, casos: dia.total });
      });

      return casos1;
    });

  response.json(casos);
});
router.get("/covid/tests/:estado", async (request, response) => {
  //const estado = req.params.estado;
  if (!request.headers.authorization) {
    return response.status(403).json({
      title: "Tu petición no tiene cabecera de autorización.",
    });
  }
  const estado = "ca";
  let tests = [];
  tests = await axios
    .get(`https://api.covidtracking.com/v1/states/${estado}/daily.json`)
    .then((response) => {
      //console.log(response.data)
      let tests1 = [];
      response.data.forEach((dia) => {
        tests1.push({ fecha: dia.date, tests: dia.totalTestsViral });
      });
      return tests1;
    });

  response.json(tests);
});
module.exports = router;
