const express = require('express');
//importamos el enrutamiento
const routerProductos = require('./routes/productos');
//importa el middleware para manejar errores
const errorHandler = require('./middlewares/errorHandler');
//importa el middleware para validar el token
const { auth } = require('express-oauth2-jwt-bearer');
const app = express();
const port = 3000;

//valida el token
const autenticacion = auth({
  audience: "http://localhost:3000/api/productos",
  issuerBaseURL: "https://dev-utn-frc-iaew.auth0.com/",
  tokenSigningAlg: "RS256",
  });
app.use(express.json());

//podemos validar en todos las rutas que se envie un token valido usando .use
//app.use(jwtCheck); //-> tenemos que declararlos antes de las rutas 

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/productos',autenticacion, routerProductos); //-> sino antes de las rutas junto con el middleware, esto es para validar en todas las rutas

//usa el middleware para manejar errores
app.use(errorHandler);
//se coloca al final de todas las rutas porque es el último middleware que se ejecuta

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});