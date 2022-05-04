const { log } = require("console");
const app = require("express");
const router = require("express").Router();
const User = require("../model/User");

//HOME:
router.get("/", async (request, response) => {
  res.json("HOME");
});

//ENDPOINT:
router.get("/endpoint", async (request, response) => {
  res.json("ENDPOINT");
});

//USERNAME:
router.get("/username", async (request, response) => {
  res.json("USERNAME");
});

//PASSWORD:
router.get("/password", async (request, response) => {
  res.json("PASSWORD");
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
      return response.status(200).json({
        title: "Usuario registrado",
        status: 200,
      });
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
router.get("/profile", async (request, response) => {
  /*if (!request.headers.authorization) {
     return res
        .status(403).json({
          title: "Tu peticion no tiene cabecera de autorizacion"
        })
  }
  var token = request.headers.authorization.split(" ")[1];
  var payload = jwt.decode(token.toString(),config.TOKEN_SECRET);
  var search= await User.findOne({email: payload.sub})
  console.log(search);
  if (payload.exp <= moment().unix()) {
    return response.status(401).send({ message: "El token ha expirado" });
  }
  res.json(search);*/
  console.log("Entro aqui");
  const email = "alvaro@gmail.com";
  var search = await User.findOne({ email: email });
  response.json(search);
});

//CHANGE_DATA:
router.post("/changeData", async (request, response) => {
  var user = await User.findOneAndUpdate(
    { email: request.body.email },
    { name: request.body.name, lastName: request.body.lastName }
  );
  response.json({ user: user, status: 200 });
});

//ESPERANZA_DE_VIDA:
router.get("/esperanza_de_vida", async (request, response) => {
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

module.exports = router;
