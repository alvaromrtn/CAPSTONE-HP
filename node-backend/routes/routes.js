const app = require("express");
const router = require("express").Router();
const User = require('../model/User')

router.get("/", async (req, res) => {
  res.json("HOME");
});

router.get("/endpoint", async (req, res) => {
  res.json("endpoint");
});

router.get("/username", async (req, res) => {
  res.json("username");
});

router.get("/password", async (req, res) => {
  
  res.json("password");
});

//login
router.post("/login", async (req, res) => {
  
  await User.findOne({email: req.body.email},async (err,user)=>{
    if(err) return res.status(500).json({
         title: 'Error del servidor',
         error: err
     })
     if(user.length===0){
         return res.status(401).json({
             title: 'Usuario no encontrado',
             error: 'Datos incorrectos'
         })
     }
     const match = await user.matchPassword(req.body.password);
     console.log(match)
     if(!match){
         return res.status(401).json({
             title: 'La contraseña no coincide',
             error: 'Datos incorrectos'
         })
     }else{
         return res.json({
          title:"Usuario registrado",
          status: 200
        })
     }
    }).clone();
});
//registro
router.post("/register", async (req, res) => {
    const {name,lastName,email,password, confirm_password}=req.body;

    const emailUser= await User.findOne({email: email});
    
    //comprobaciones de si las contraseñas son iguales, longitud de contraseñas, formato email
    if(emailUser){
        res.json({
            title: 'El usuario ya existe',
            status: 401
        });
    }
    const newUser = new User({name,lastName,email, password})
    newUser.password= await newUser.encryptPassword(password);
    console.log(newUser.password)
    await newUser.save(function(err){
        return res.json({
          title:"Usuario registrado",
          status: 200
        })
    });
});

router.get('/profile',async (req,res)=>{
  /*if (!req.headers.authorization) {
     return res
        .status(403).json({
          title: "Tu peticion no tiene cabecera de autorizacion"
        })
  }
  var token = req.headers.authorization.split(" ")[1];
  var payload = jwt.decode(token.toString(),config.TOKEN_SECRET);
  var search= await User.findOne({email: payload.sub})
  console.log(search);
  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: "El token ha expirado" });
  }
  res.json(search);*/
  console.log("Entro aqui")
  const email = "alvaro@gmail.com"
  var search= await User.findOne({email: email})
  res.json(search);
})

router.post('/changeData',async (req,res) => {    
  var search=await User.findOneAndUpdate({email: req.body.email},{name: req.body.name,lastName:req.body.lastName})
  res.json(search)
})

router.get("/esperanza_de_vida", async (req, res) => {
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

module.exports = router;
