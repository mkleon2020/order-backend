/*

Ruta: /api/hospitales

*/

const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validator-fields');
const {getHospitales,crearHospital,actualizarHospital,borrarHospital} = require('../controllers/hospitales');
const { validarJWT } = require('../middlewares/auth-jwt');
const router = Router();


router.get('/' ,getHospitales);
router.post('/',validarJWT,
	[
		check('nombre','El nombre del Hospital es necesario').not().isEmpty(),
		validarCampos
	],
	crearHospital
);
router.put('/:id',validarJWT,
	[
		check('nombre','El nombre del Hospital es necesario').not().isEmpty(),
		validarCampos
	],
	actualizarHospital
);
router.delete('/:id',validarJWT,borrarHospital);

module.exports = router;

