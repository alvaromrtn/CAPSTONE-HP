const { log } = require("console");
const app = require("express");
const router = require("express").Router();
<<<<<<< HEAD
const User = require('../model/User')
const service=require('../config/service') 
=======
const User = require("../model/User");
>>>>>>> b72d10271c40aba7cb8e7ced685ef4dfb3c2433d

//HOME:
router.get("/", async (request, response) => {
  res.json("HOME");
});

<<<<<<< HEAD
/*router.get("/endpoint", async (req, res) => {
  res.json("endpoint");
=======
//ENDPOINT:
router.get("/endpoint", async (request, response) => {
  res.json("ENDPOINT");
>>>>>>> b72d10271c40aba7cb8e7ced685ef4dfb3c2433d
});

//USERNAME:
router.get("/username", async (request, response) => {
  res.json("USERNAME");
});

<<<<<<< HEAD
router.get("/password", async (req, res) => {
  
  res.json("password");
});*/

//login
router.post("/login", async (req, res) => {
  await User.findOne({email: req.body.email},async (err,user)=>{
    if(err) return res.status(500).json({
         title: 'Error del servidor',
         error: err
     })
     if(user.length===0){
         return res.status(201).json({
             title: 'Usuario no encontrado',
             error: 'Datos incorrectos'
         })
     }
     const match = await user.matchPassword(req.body.password);
     console.log(match)
     if(!match){
         return res.status(202).json({
             title: 'La contraseña no coincide',
             error: 'Datos incorrectos'
         })
     }else{
        return res.status(200).send({token: service.createToken(user)})
     }
    }).clone();
});
//registro
router.post("/register", async (req, res) => {
    const {name,lastName,email,password, confirm_password}=req.body;
    const emailUser= await User.findOne({email: email});
    if(emailUser){
        res.json({
            title: 'El usuario ya existe',
            status: 201
        });
    }
    const newUser = new User({name,lastName,email, password})
    newUser.password= await newUser.encryptPassword(password);
    await newUser.save(function(err){
        return res.json({
          title:"Usuario registrado",
          status: 200
        })
    });
});

router.get('/profile',async (req,res)=>{
  console.log("los headers son" +req.headers.authorization)
  if (!req.headers.authorization) {
=======
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
>>>>>>> b72d10271c40aba7cb8e7ced685ef4dfb3c2433d
     return res
        .status(403).json({
          title: "Tu peticion no tiene cabecera de autorizacion"
        })
  }
<<<<<<< HEAD

  //var token = req.headers.authorization.split(" ")[1];
  //var payload = jwt.decode(token.toString(),config.TOKEN_SECRET);
  const email = "alvaro@gmail.com"
  var search= await User.findOne({email: email})//payload.sub
  console.log(search);
  /*if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: "El token ha expirado" });
  }*/
  res.json(search);
  /*const email = "alvaro@gmail.com"
  var search= await User.findOne({email: email})
  res.json(search);*/
})

router.post('/changeData',async (req,res) => {
  ///comprobamos cabecera
  if (!req.headers.authorization) {
    return res
       .status(403).json({
         title: "Tu peticion no tiene cabecera de autorizacion"
       })
  }
  var search=await User.findOneAndUpdate({email: req.body.email},{name: req.body.name,lastName:req.body.lastName})
  res.json(search)
})

router.get("/esperanza_de_vida", async (req, res) => {
  //comprobamos la cabecera
  if (!req.headers.authorization) {
    return res
       .status(403).json({
         title: "Tu peticion no tiene cabecera de autorizacion"
       })
  }
=======
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
>>>>>>> b72d10271c40aba7cb8e7ced685ef4dfb3c2433d
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
router.delete('/:id',async (req,res) =>{
  //comprobamos cabecera
  /*if (!req.headers.authorization) {
    return res
       .status(403).json({
         title: "Tu peticion no tiene cabecera de autorizacion"
       })
  }*/
  console.log("Entro en la ruta de eliminar")
  //await User.findByIdAndRemove(req.params.id);
  res.json({
      status:'Usuario eliminado'
  });
})

module.exports = router;
