import app from "./app";
const https = require("https");
const fs = require("fs");

/* const main = () => {

    https.createServer(
        {
            key: fs.readFileSync("./src/key/key.pem"),
            cert: fs.readFileSync("./src/key/cert.pem"),
        }
        , app).
        listen(app.get("port"), () => console.log(`Server on port ${app.get("port")}`))
} */

const main = () => {
    app.listen(app.get("port"));
    console.log(`Server on port ${app.get("port")}`);
};

main();