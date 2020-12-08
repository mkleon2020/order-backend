/*

Ruta: /api/medicos

*/

const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validator-fields');
const {getMedicos,crearMedico,actualizarMedico,borrarMedico} = require('../controllers/medicos');
const { validarJWT } = require('../middlewares/auth-jwt');
const router = Router();


router.get('/' ,getMedicos);
router.post('/',validarJWT,
	[
		check('nombre','El nombre del Medico es necesario').not().isEmpty(),
		check('hospital','El Hospital ID  debe ser valido').isMongoId(),
		validarCampos
	],
	crearMedico
);
router.put('/:id',validarJWT,
	[
		check('nombre','El nombre del medico es necesario').not().isEmpty(),
		check('hospital','El Hospital ID  debe ser valido').isMongoId(),
		validarCampos
	],
	actualizarMedico
);
router.delete('/:id',borrarMedico);

module.exports = router;

