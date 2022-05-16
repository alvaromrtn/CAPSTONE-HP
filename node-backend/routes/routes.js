const app = require("express");
const router = require("express").Router();
const User = require('../model/User')
const service=require('../config/service') 

router.get("/", async (req, res) => {
  res.json("HOME");
});

/*router.get("/endpoint", async (req, res) => {
  res.json("endpoint");
});

router.get("/username", async (req, res) => {
  res.json("username");
});

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
     return res
        .status(403).json({
          title: "Tu peticion no tiene cabecera de autorizacion"
        })
  }

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
  res.json(paises);
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
