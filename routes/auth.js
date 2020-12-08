/*

Ruta: /api/login

*/

const {Router} = require('express');
const {check} = require('express-validator');
const { validarJWT } = require('../middlewares/auth-jwt');
const { login,googleSignIn, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validator-fields');
const router = Router();
router.post('/',
	[
		check('email','El Email es obligatorio').isEmail(),
		check('password','La Clave es obligatoria').not().isEmpty(),
		validarCampos
	],
	login
);
router.post('/google',
	[
		check('token','El token de google es obligatorio').not().isEmpty(),
		validarCampos
	],
	googleSignIn
);
router.get('/renew',validarJWT,renewToken);
module.exports = router;