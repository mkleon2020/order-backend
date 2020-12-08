/*

Ruta: /api/lista

*/

const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validator-fields');
const {crearLista} = require('../controllers/lista_controller');
const { validarJWT } = require('../middlewares/auth-jwt');
const router = Router();



router.post('/',validarJWT,
	[
		check('nombre','El nombre del Hospital es necesario').not().isEmpty(),
		validarCampos
	],
	crearLista
);

module.exports = router;

