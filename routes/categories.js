const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos,  isRolAdmin, hasRole , validarJTW } = require('../middlewares');

const { isCategoryExist, existNameCategory } = require('../helpers/db-validators');

const { createCategory, 
        getCategories, 
        getCategory, 
        updateCategory, 
        deleteCategory } = require('../controllers/categories');

const router = Router();

/**
 * Obtener todas la categorias (publico)
 */
router.get('/', getCategories)

/**
 * Obtener una categoria por id (publico)
 */
router.get('/:id',[
    check('id', "No es un ID válido").isMongoId(),
    check('id').custom(isCategoryExist),
    validarCampos
],getCategory)

/**
 * Crear categoria privado - cualquier persona con un token válido
 */
router.post('/',[
    validarJTW,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('name').custom(existNameCategory),
    validarCampos
],createCategory)

/**
 * Actualizar - privado - cualquiera con token válido
 */
 router.put('/:id', [
    validarJTW,
    check('id', "No es un ID válido").isMongoId(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(isCategoryExist),
    validarCampos
 ],updateCategory)

/**
 * Borrar una categoria - Admin
 */
 router.delete('/:id', [
    validarJTW,
    isRolAdmin,
    check('id', "No es un ID válido").isMongoId(),
    check('id').custom(isCategoryExist),
    validarCampos
 ],deleteCategory)

module.exports = router;