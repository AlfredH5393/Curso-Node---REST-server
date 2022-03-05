const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos,  isRolAdmin, hasRole , validarJTW } = require('../middlewares');

const { isRoleValid, isEmailExistDB, isUserExistById } = require('../helpers/db-validators');

const { usersGet, 
        usersPost, 
        usersPut,
        usersPatch, 
        usersDelete } = require('../controllers/users');

const router = Router();

router.get('/', usersGet);

router.post('/', [
        check('name', 'El nombre es obligaorio').not().isEmpty(),
        check('password', 'El password debe ser al menos de 6 caracteres').isLength({ min: 6 }),
        check('email', 'El correo no es valido').isEmail(),
        check('email').custom(isEmailExistDB),
        check('rol').custom(isRoleValid),
        validarCampos
], usersPost);

//Parametros de segmento 
router.put('/:id', [
        check('id', 'No es ID valido').isMongoId(),
        check('id').custom(isUserExistById),
        check('rol').custom(isRoleValid),
        validarCampos
], usersPut);

router.delete('/:id', [
        validarJTW,
        //isRolAdmin,
        hasRole('ADMIN_ROLE','VENTAS_ROLE'),
        check('id', 'No es ID valido').isMongoId(),
        check('id').custom(isUserExistById),
        validarCampos
], usersDelete)

router.patch('/', usersPatch)

module.exports = router;