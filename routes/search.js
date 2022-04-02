const {Router} = require('express');

const router = new Router();

const { search } = require('../controllers/search');

router.get('/:coleccion/:termino', search);


module.exports = router;