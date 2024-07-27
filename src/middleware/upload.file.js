const multer = require("multer") //permite cargar archivos (valida tipo de archivo, tamaño, etc)
const cloudinary = require("cloudinary").v2 //servidor
const { CloudinaryStorage } = require("multer-storage-cloudinary") //configura el almacen para cargar los archivos en cloudinary

// permite subir a cloudinary las imagenes previamente validadas con el multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "invoiceImages",
        allowedFormats: ["png", "jpg", "jpeg"]
    }
})

// subo la imagen que cumpla con los  parametros definidos
const upload = multer({ storage });//multer verifica los datos de storage
module.exports = upload;