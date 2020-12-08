const {response} = require('express');
const Medico = require('../models/medico');
const getMedicos = async(req, res) => {
	const medicos = await Medico.find()
	.populate("usuario","nombre").populate("hospital","nombre")
	res.json({
		ok:true,
		medicos
	});
}

const crearMedico = async(req, res = response) => {

	const uid = req.uid;
	const medico = new Medico({
		usuario:uid,
		...req.body
	});
	
	try {
	
		
		// Guardar usuario
		const medicoDB = await medico.save();
		res.json({
			ok:true,
			medico:medicoDB,
		});
		
	} catch (error) {

		res.status(500).json({
			ok: false,
			msg: 'Hable con el administrador'
		})
		
	}

}

const actualizarMedico = async(req, res = response) => {

	const id = req.params.id;
	const uid = req.uid;
try {
	const medicoDB = await Medico.findById(id);

	if(!medicoDB){
		return res.status(404).json({
			ok: false,
			msg:'No existe un medico por  ese ID'
		});
	}
	
	//Actualizar
	const cambiosMedico = {
		...req.body,
		usuario:uid
	}
	const medicoActualizado = await Medico.findByIdAndUpdate(id,cambiosMedico,{new:true});
	res.json({
		ok:true,
		medico:medicoActualizado
	});

	
} catch (error) {
	res.status(500).json({
		ok: false,
		msg: 'Error inesperado'
	});
}

}
const borrarMedico = async(req, res = response) => {
	const uid = req.params.id;
	
	try {
		const medicoDB = await Medico.findById(uid);

	if(!medicoDB){
		return res.status(404).json({
			ok: false,
			msg:'No existe un usuario por  ese ID'
		});
	}
	await Medico.findByIdAndDelete(uid);
	res.json({
		ok: true,
		msg: 'Medico eliminado'
	});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error inesperado'
		});
	}
	
}


module.exports = {
	getMedicos,
	crearMedico,
	actualizarMedico,
	borrarMedico
}