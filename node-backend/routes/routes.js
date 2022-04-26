const app = require("express");
const router = require("express").Router();

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
  //comprobar datos
  console.log(req.body);
  res.status(200).send(req.body);
});
//registro
router.post("/register", async (req, res) => {
  //comprobar datos
  console.log(req.body);
  res.status(200).send(req.body);
});

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
