const { Router } = require('express');
const { usersGet, 
        usersPost, 
        usersPut,
        usersPatch, 
        usersDelete } = require('../controllers/users.controller')

const router = Router();

router.get('/', usersGet);

router.post('/', usersPost);

//Parametros de segmento
router.put('/:id', usersPut);

router.delete('/', usersDelete)

router.patch('/', usersPatch)

module.exports = router;