const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarArchivos } = require('../middlewares');
const { allowsCollecions } = require('../helpers');
const { loadFilesImages, 
        loadFilesOffice, 
        updateImages,
        updateImagesCloundinary, 
        loadImagesCloundinary,
        loadImages } = require('../controllers/uploads');

const router = Router();

router.post("/loadFilesImages",[validarArchivos],loadFilesImages);

router.post("/loadFilesOffice",[validarArchivos],loadFilesOffice);

router.put("/:coleccion/:id",[
    validarArchivos,
    check("id", "El id deber ser de mongo").isMongoId(),
    validarCampos,
    check("coleccion").custom(c => allowsCollecions(c, ["users","products"])),
    validarCampos
], updateImagesCloundinary);
// ], updateImages);

router.get("/:coleccion/:id",[
    check("id", "El id deber ser de mongo").isMongoId(),
    validarCampos,
    check("coleccion").custom(c => allowsCollecions(c, ["users","products"])),
    validarCampos
], loadImages)

module.exports = router;