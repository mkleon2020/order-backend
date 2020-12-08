/*

Ruta: /api/uploads

*/

const {Router} = require('express');
const expressFileUpload = require('express-fileupload');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validator-fields');
const {fileUpload,getImage} = require('../controllers/uploads');
const { validarJWT } = require('../middlewares/auth-jwt');
const router = Router();
router.use(expressFileUpload());
router.put('/:type/:id',validarJWT,fileUpload);
router.get('/:type/:img',getImage);



module.exports = router;

