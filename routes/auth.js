const { Router } = require('express');
const { check } = require('express-validator');
const { route } = require('express/lib/application');
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.post('/login',[
    check('email','El correo no es valido').isEmail(),
    check('password','El password el obligotartorio').not().isEmpty(),
    validarCampos
],login)

router.post('/google',[
    check('id_token','El id_token es necesario').not().isEmpty(),
], googleSignIn)
module.exports = router;