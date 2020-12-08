/*

Ruta: /api/comerciantes

*/

const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validator-fields');
const { getComerciantes,crearComerciante,actualizarComerciante,borrarComerciante } = require('../controllers/comerciante_controller');
const { validarJWT } = require('../middlewares/auth-jwt');
const router = Router();


router.get('/', validarJWT,getComerciantes);
router.post('/',
	[
		check('user_tienda','El nombre de tienda es obligatorio').not().isEmpty(),
		check('ruc','La Clave es obligatoria').not().isEmpty(),
		check('nombre_tienda','El Email es obligatorio').not().isEmpty(),
		validarCampos
	],
	crearComerciante
);
router.put('/:id',validarJWT,
	[
		check('nombre','El nombre es obligatorio').not().isEmpty(),
		check('email','El Email es obligatorio').isEmail(),
		validarCampos
	],
	actualizarComerciante
);
router.delete('/:id',validarJWT,borrarComerciante);

module.exports = router;

