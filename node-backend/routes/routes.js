const router = require("express").Router();
const User = require("../model/User");
const service = require("../config/service");
const axios = require("axios");
var jwt = require("jwt-simple");
const config = require("../config/token");
const moment = require("moment");

//HOME:
router.get("/", async (request, response) => {
  res.json("HOME");
});

//LOGIN:
/**
 * @swagger
 * /api/routes/login:
 *   post:
 *     summary: Comprobar el login de un usuario
 *     tags: [POST]
 *     parameters:
 *      - in: body
 *        name: Login
 *        description: Comprobar si los datos introducidos por el usuario son correctos y si está previamente registrado en el sisema
 *        schema:
 *          type: object
 *          required:
 *            - email
 *            - password
 *          properties:
 *            email:
 *              type: string
 *              example: example@gmail.com
 *            password:
 *              type: string
 *              example: example123
 *     responses:
 *      '200':
 *        description: Login correcto
 *      '500':
 *        description: Error del servidor
 *      '201':
 *        description: Usuario no encontrado.
 *      '202':
 *        description: La contraseña no coincide.
 */
router.post("/login", async (request, response) => {
  await User.findOne({ email: request.body.email }, async (error, user) => {
    if (error)
      return res.status(500).json({
        title: "Error del servidor",
        error: err,
      });
    if (user === null) {
      return res.status(201).json({
        title: "Usuario no encontrado",
        error: "Datos incorrectos",
      });
    }
    const match = await user.matchPassword(request.body.password);
    console.log(match);
    if (!match) {
      return response.status(202).json({
        title: "La contraseña no coincide",
        error: "Datos incorrectos",
      });
    } else {
      return response.status(200).send({ token: service.createToken(user) });
    }
  }).clone();
});

//REGISTER:
/**
 * @swagger
 * /api/routes/register:
 *   post:
 *     summary: Registrar un usuario
 *     tags: [POST]
 *     parameters:
 *      - in: body
 *        name: Registro
 *        description: Registrar un usuario en nuestro comprobando previamente que los datos son correctos y que no esta previamente registrado en el sistema
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - lastName
 *            - email
 *            - password
 *            - confirm_password
 *          properties:
 *            name:
 *              type: string
 *              example: exampleName
 *            lastName:
 *              type: string
 *              example: exampleLastName
 *            email:
 *              type: string
 *              example: example@gmail.com
 *            password:
 *              type: string
 *              example: example123
 *            confirm_password:
 *              type: string
 *              example: example123
 *     responses:
 *      '200':
 *        description: Resgistro correcto
 *      '500':
 *        description: Error del servidor
 *      '201':
 *        description: El usuario ya existe en la base de datos
 *      '202':
 *        description: Datos incorrectos
 */
router.post("/register", async (request, response) => {
  const { name, lastName, email, password, confirm_password } = request.body;
  const errors = [];
  if (email.length <= 0) {
    errors.push("Por favor, introduce un nombre valido");
  }
  if (password != confirm_password) {
    errors.push("Las contraseñas no coinciden");
  }
  if (password == null || password.length < 4) {
    errors.push("La longitud de la contraseña debe ser mayor que 4");
  }
  if (errors.length > 0) {
    //res.json(errors)
    return res.status(202).json({
      title: "Los datos son incorrectos",
      error: "Datos incorrectos",
      errores: errors,
    });
  }
  const emailUser = await User.findOne({ email: email });
  if (emailUser) {
    response.json({
      title: "El usuario ya existe",
      status: 201,
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
/**
 * @swagger
 * /api/routes/profile:
 *  get:
 *    summary: Obtener los datos personales del usuario
 *    tags: [GET]
 *    responses:
 *      '200':
 *        description: Datos personales obtenidos correctamente
 *      '403':
 *        description: La peticion no tiene cabecera de autorizacion
 *      '500':
 *        description: Error del servidor
 */
router.get("/profile", async (request, response) => {
  if (!request.headers.authorization) {
    response.status(403).json({
      title: "Tu petición no tiene cabecera de autorización.",
    });
    return;
  }

  var token = request.headers.authorization.split(" ")[1];
  var payload = jwt.decode(token.toString(), config.TOKEN_SECRET);

  var user = await User.findOne({ email: payload.sub }); //payload.sub

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: "El token ha expirado" });
  }
  response.json(user);
});

//CHANGE_DATA:
/**
 * @swagger
 * /api/routes/changeData:
 *   post:
 *     summary: Cambiar datos personales usuario
 *     tags: [POST]
 *     parameters:
 *      - in: body
 *        name: Cambiar datos personales usuario
 *        description: Cambiar datos personales usuario
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - lastName
 *            - email
 *            - password
 *          properties:
 *            name:
 *              type: string
 *              example: exampleName
 *            lastName:
 *              type: string
 *              example: exampleLastName
 *            email:
 *              type: string
 *              example: example@gmail.com
 *            password:
 *              type: string
 *              example: example123
 *     responses:
 *      '200':
 *        description: Datos cambiados correctamente
 *      '500':
 *        description: Error del servidor
 *      '403':
 *        description: La peticion no tiene cabecera de autorizacion
 */
router.post("/changeData", async (request, response) => {
  //Comprobamos la cabecera:
  console.log("Entro aqui para cambiar los datos del perfil");
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
/**
 * @swagger
 * /api/routes/esperanza_de_vida:
 *  get:
 *    summary: Obtener la esperanza de vida de varios paises
 *    tags: [GET]
 *    responses:
 *      '200':
 *        description: Datos  obtenidos correctamente
 *      '403':
 *        description: La peticion no tiene cabecera de autorizacion
 *      '500':
 *        description: Error del servidor
 */
router.get("/esperanza_de_vida", async (request, response) => {
  //Comprobamos la cabecera:
  console.log(request.headers.authorization);
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
/**
 * @swagger
 * /api/routes/{id}:
 *  delete:
 *    summary: Eliminar un usuario por su ID
 *    tags: [DELETE]
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID
 *        required: true
 *        type: string
 *    description: Obtener ID
 *    responses:
 *      '200':
 *        description: Usuario eliminado correctamente
 *      '500':
 *        description: No ha sido posible eliminar el usuario
 */
router.delete("/:id", async (request, response) => {
  //Comprobamos la cabecera:
  if (!request.headers.authorization) {
    return response.status(403).json({
      title: "Tu petición no tiene cabecera de autorización.",
    });
  }
  await User.findByIdAndRemove(request.params.id);
  response.json({
    status: "Usuario eliminado",
  });
});

///////API COVID///////////
//DATOS POR ESTADO (PARAMETRO) Y FECHA (A MANO) FORMATO AAAA/MM/DD ??
/**
 * @swagger
 * /api/routes/covid/hoy/{estado} :
 *  get:
 *    summary: Obtener los datos del dia establecido del estado pasado por parametro
 *    tags: [GET]
 *    parameters:
 *      - in: path
 *        name: estado
 *        description: Abreviatura del estado
 *        required: true
 *        type: string
 *    responses:
 *      '200':
 *        description: Datos diarios del estado obtenidos correctamente
 *      '403':
 *        description: La peticion no tiene cabecera de autorizacion
 *      '500':
 *        description: Error del servidor
 */
router.get("/covid/hoy/:estado", async (request, response) => {
  //const estado = request.params.estado;
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

//DATOS DE MUERTES POR ESTADO (PARAMETRO)
/**
 * @swagger
 * /api/routes/covid/muertes/{estado} :
 *  get:
 *    summary: Obtener las muertes por covid del estado pasado por parametro
 *    tags: [GET]
 *    parameters:
 *      - in: path
 *        name: estado
 *        description: Abreviatura del estado
 *        required: true
 *        type: string
 *    responses:
 *      '200':
 *        description: Datos de muertes del estado obtenidos correctamente
 *      '403':
 *        description: La peticion no tiene cabecera de autorizacion
 *      '500':
 *        description: Error del servidor
 */
router.get("/covid/muertes/:estado", async (request, response) => {
  //const estado = request.params.estado;
  if (!request.headers.authorization) {
    response.status(403).json({
      title: "Tu petición no tiene cabecera de autorización.",
    });
    return;
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

  response.json(muertes);
});

//DATOS DE CASOS POR ESTADO (PARAMETRO)
/**
 * @swagger
 * /api/routes/covid/casos/{estado} :
 *  get:
 *    summary: Obtener los datos de los casos del estado pasado por parametro
 *    tags: [GET]
 *    parameters:
 *      - in: path
 *        name: estado
 *        description: Abreviatura del estado
 *        required: true
 *        type: string
 *    responses:
 *      '200':
 *        description: Datos  de casos obtenidos correctamente
 *      '403':
 *        description: La peticion no tiene cabecera de autorizacion
 *      '500':
 *        description: Error del servidor
 */
router.get("/covid/casos/:estado", async (request, response) => {
  //const estado = req.params.estado;
  if (!request.headers.authorization) {
    response.status(403).json({
      title: "Tu petición no tiene cabecera de autorización.",
    });
    return;
  }
  const estado = "ca";
  let casos = [];
  casos = await axios
    .get(`https://api.covidtracking.com/v1/states/${estado}/daily.json`)
    .then((response) => {
      let casos1 = [];
      response.data.forEach((dia) => {
        casos1.push({ fecha: dia.date, casos: dia.total });
      });

      return casos1;
    });

  response.json(casos);
});
//DATOS DE test POR ESTADO (PARAMETRO)
/**
 * @swagger
 * /api/routes/covid/tests/{estado} :
 *  get:
 *    summary: Obtener los datos de los tests del estado pasado por parametro
 *    tags: [GET]
 *    parameters:
 *      - in: path
 *        name: estado
 *        description: Abreviatura del estado
 *        required: true
 *        type: string
 *    responses:
 *      '200':
 *        description: Datos de los tests del estado obtenidos correctamente
 *      '403':
 *        description: La peticion no tiene cabecera de autorizacion
 *      '500':
 *        description: Error del servidor
 */
router.get("/covid/tests/:estado", async (request, response) => {
  //const estado = request.params.estado;
  if (!request.headers.authorization) {
    response.status(403).json({
      title: "Tu petición no tiene cabecera de autorización.",
    });
    return;
  }
  const estado = "ca";
  let tests = [];
  tests = await axios
    .get(`https://api.covidtracking.com/v1/states/${estado}/daily.json`)
    .then((response) => {
      let tests1 = [];
      response.data.forEach((dia) => {
        tests1.push({ fecha: dia.date, tests: dia.totalTestsViral });
      });
      return tests1;
    });

  response.json(tests);
});

module.exports = router;
