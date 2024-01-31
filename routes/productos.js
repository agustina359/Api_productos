const express = require("express");
const Producto = require("../models/producto");
const { requiredScopes }  = require('express-oauth2-jwt-bearer');
const routerProductos = express.Router();

//ahora que va a estar conectada a la base de datos tenemos que cambiar las funciones
routerProductos.get("/",requiredScopes("read:productos"), async (req, res,next) => {
    //colocamos un try/cach para controlar la asincronia
    try{
        //con el await esperamos la respuesta del servidor que se ejecuta en el .find()
        const productos = await Producto.find();
        //res es la respuesta del servido, entonces establecemos un estado 200 y las respuesta en formato JSON de productos obtenidos
        res.status(200).json({
            mensaje:"Se pudieron obtener todos los productos",
            data:productos}
            );
    }catch(error){
        //el catch obtiene un posible error que pueda surgir en ele try por ende tenemos que armar la respuesta para que devuelva el error
        res.status(500).json({ //-> establecemos el estado en 500  
            error: "Error al obtener los libro" // -> indicamos un mensaje de error en formato JSON
        })
    }
});

routerProductos.get("/:id",requiredScopes("read:productos"),async (req,res)=>{
    try{
        const productoBuscado = await Producto.findById(req.params.id);
        if(!productoBuscado){
            return res.status(404).json({error:"Error al buscar el producto"});
        }
        res.status(200).json({
            mensaje:"Producto Encontrado",
            data:productoBuscado
        })
    }catch(error){
        res.status(500).json({
            error:"Error al obtener el producto"
        })
    }
})


module.exports = routerProductos;