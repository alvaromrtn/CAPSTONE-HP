<<<<<<< HEAD
const express = require('express');

const app = express()
const port = 8080

const cors = require('cors');
var corsOptions={
    origin:'*',
    optionsSuccessStatus: 200
}

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors(corsOptions));


//app.use('/api/routes',require('./routes/routes'));


app.listen(port, () => {
    console.log('Ejecutando...')    
});
=======
jdsf
>>>>>>> 1bdb68b008b0272b76c79acc0598dc6771ba5f3b
