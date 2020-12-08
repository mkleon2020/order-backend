/*

Ruta: /api/usuarios

*/

const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validator-fields');
const { getUsuarios,crearUsuario,actualizarUsuario,borrarUsuario } = require('../controllers/usuario');
const { validarJWT } = require('../middlewares/auth-jwt');
const router = Router();


router.get('/', validarJWT,getUsuarios);
router.post('/',
	[
		check('nombre','El nombre es obligatorio').not().isEmpty(),
		check('user','El usuario es obligatorio').not().isEmpty(),
		check('password','La Clave es obligatoria').not().isEmpty(),
		check('email','El Email es obligatorio').isEmail(),
		validarCampos
	],
	crearUsuario
);
router.put('/:id',validarJWT,
	[
		check('nombre','El nombre es obligatorio').not().isEmpty(),
		check('email','El Email es obligatorio').isEmail(),
		validarCampos
	],
	actualizarUsuario
);
router.delete('/:id',validarJWT,borrarUsuario);

module.exports = router;

