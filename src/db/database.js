import mysql from "promise-mysql";
import config from "./../config";

/**
 * Función para establecer la conexión con la base de datos
 * Los datos se obtienen del fichero .env
 */
const connection = mysql.createConnection({
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password
});

const getConnection = () => {
    return connection;
}

module.exports = {
    getConnection
}