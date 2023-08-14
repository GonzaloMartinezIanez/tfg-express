import app from "./app";
const https = require("https");
const fs = require("fs");

// Hay que generar un certificado válido
/* const main = () => {
    https.createServer(
        {
            key: fs.readFileSync("./src/key/key.pem"),
            cert: fs.readFileSync("./src/key/cert.pem"),
        }
        , app).
        listen(app.get("port"), () => console.log(`Server on port ${app.get("port")}`))
} */

// Función que lanza la aplicacion
const main = () => {
    app.listen(app.get("port"));
    console.log(`Server on port ${app.get("port")}`);
};

main();