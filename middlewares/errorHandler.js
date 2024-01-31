// Obtiene los errores de la aplicación y los envía al cliente
const errorHandler = (err, req, res, next) => {

    // si el error no tiene un código de estado, le asignamos 500
    const status = err.status || 500;
    
    // construimos el mensaje de error que se le enviará al cliente en formato JSON
    const errorResponse = {
        error: {
            message: err.message || "Internal Server Error",
            code : err.code || "internal_error",
        },
    };

    // enviamos el mensaje de error al cliente
    res.status(status).json(errorResponse);
};


// exportamos el middleware
module.exports = errorHandler;

//Esto nos permite que cada vez que haya un error en la aplicación, se envíe un mensaje de error al cliente en formato JSON. Lo que nos permite poder manejar los errores en el cliente de una manera más sencilla.