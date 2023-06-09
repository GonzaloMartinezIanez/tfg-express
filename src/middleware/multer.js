const path = require('path')
const multer = require('multer')

/**
 * Middleware para guardar en la carpeta "uploads" el fichero
 * que se envia en la peticion
 */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

export const methods = {
    upload
}