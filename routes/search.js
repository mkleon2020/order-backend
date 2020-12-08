/*

Ruta: /api/todo/:search

*/

const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validator-fields');
const {getSearch,getDocumentCollection} = require('../controllers/search');
const { validarJWT } = require('../middlewares/auth-jwt');
const router = Router();


router.get('/:search' ,validarJWT,getSearch);
router.get('/collection/:tabla/:busqueda' ,validarJWT,getDocumentCollection);

module.exports = router;

