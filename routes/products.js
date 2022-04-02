const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos,  isRolAdmin, hasRole , validarJTW } = require('../middlewares');

const { isCategoryExist, 
        isProductExist,
        existNameProduct} = require('../helpers/db-validators');

const { createProduct, 
        getProducts, 
        getProduct, 
        updateProduct, 
        deleteProduct} = require('../controllers/products');

const router = Router();

/**
 * Obtener todas la categorias (publico)
 */
router.get('/', getProducts)

/**
 * Obtener una categoria por id (publico)
 */
router.get('/:id',[
    check('id', "No es un ID válido").isMongoId(),
    check('id').custom(isProductExist),
    validarCampos
],getProduct)

/**
 * Crear categoria privado - cualquier persona con un token válido
 */
router.post('/',[
    validarJTW,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('category', 'La categoria es obligatorio').not().isEmpty(),
    check('category').isMongoId(),
    validarCampos,
    check('name').custom(existNameProduct),
    validarCampos,
    check('category').custom(isCategoryExist),
    validarCampos
],createProduct)

/**
 * Actualizar - privado - cualquiera con token válido
 */
 router.put('/:id', [
    validarJTW,
    check('id', "No es un ID válido").isMongoId(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('category', 'La categoria es obligatorio').not().isEmpty(),
    check('category').isMongoId(),
    check('id').custom(isProductExist),
    validarCampos,
    check('category').custom(isCategoryExist),
    validarCampos
 ],updateProduct)

/**
 * Borrar una categoria - Admin
 */
 router.delete('/:id', [
    validarJTW,
    isRolAdmin,
    check('id', "No es un ID válido").isMongoId(),
    validarCampos,
    check('id').custom(isProductExist),
    validarCampos
 ],deleteProduct)

module.exports = router;