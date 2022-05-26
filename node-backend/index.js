const express = require("express");

const app = express();
const port = 8080;

require('./database');

const cors = require("cors");
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/routes", require("./routes/routes"));





////////////////swagger//////////////////
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerDefinition = {
    info: {
      title: "Implementar y usar Swagger en Node.js",
      description:
        "Documentar API RESTful en un servidor web creado en Node.js con el enfoque OpenAPI",
    },
    servers: ["http://localhost:8080"],
    definitions: {
      User: {
        required: ["name","lastName","email","password"],
        properties: {
          name: {
            description: "Nombre del usuario",
            type: "String",
            example: "Usuario ejemplo",
          },
          lastName: {
            description: "Apellidos del usuario",
            type: "String",
            example: "Apellidos usuario ejemplo",
          },
         email: {
            description: "Email del usuario",
            type: "String",
            example: "example@gmail.com",
          },
         password: {
            description: "Contraseña del usuario, se almacena encriptada en la base de datos",
            type: "String",
            example: "example123",
          },
        },
      },
    },
  };
  
const swaggerOptions = {
    swaggerDefinition,
    //apis: ["./routes/*.js"],
    apis: ["./routes/*.js"]
};

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerJsDoc(swaggerOptions))
  );



////////////////////////////////////////

app.listen(port, () => {
  console.log("Ejecutando...");
});
