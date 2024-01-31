// exportamos la libreria mongoose para poder conectar la base de datos
const mongoose = require('mongoose');
//creamos una variable URL para poder asignarle la ruta donde se conecta la base de datos
const url = "mongodb://127.0.0.1:27017/biblioteca";
//utilizamos .connect y le pasamos la url para poner conectar la base de datos en la url asignada
 mongoose.connect(url);

 //creasmos el esquema con el cual se van a leer los datos y guardar en la base de datos
 const schemaProducto = new mongoose.Schema({ // -> .Schema es una metodo que nos permite generarla
    nombre:String, //-> indicamos las propiedades del schema
    descripcion:String
 },{
    collection:'libros' //-> indicamos que se van a almacenar en esa coleccion
 });

 //indicamos que con el schema se va a utilizar para leer los datos, entonces creamos el modelo ("clase")
 const Producto = mongoose.model('Producto', schemaProducto);

module.exports = Producto;