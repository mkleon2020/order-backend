const {response} = require('express');
const Hospital = require('../models/hospital');
const getHospitales = async(req, res) => {
	const hospitales = await Hospital.find()
	.populate('usuario','nombre')
	res.json({
		ok:true,
		hospitales
	});
}

const crearHospital = async(req, res = response) => {

	const uid = req.uid;
	const hospital = new Hospital({
		usuario:uid,
		...req.body
	});
	try {
		
		// Guardar Hospital
		const hospitalDB = await hospital.save();
		res.json({
			ok:true,
			Hospital:hospitalDB,
		});
		
	} catch (error) {

		res.status(500).json({
			ok: false,
			msg: 'Hable con el administrador'
		})
		
	}

}

const actualizarHospital = async(req, res = response) => {
// id hospital
	const id = req.params.id;
// id de usuario que viene de la validacion
	const uid = req.uid;
try {
	const hospitalDB = await Hospital.findById(id);

	if(!hospitalDB){
		return res.status(404).json({
			ok: false,
			msg:'No existe Hospital'
		});
	}
	
	//Actualizar
	const cambiosHopistal = {
		...req.body,
		usuario:uid
	}
	
	const hospitalActualizado = await Hospital.findByIdAndUpdate(id,cambiosHopistal,{new:true});
	res.json({
		ok:true,
		hospital:hospitalActualizado
	});

	
} catch (error) {
	res.status(500).json({
		ok: false,
		msg: 'Error inesperado'
	});
}

}
const borrarHospital = async(req, res = response) => {
	const uid = req.params.id;
	
	try {
		const hospitalDB = await Hospital.findById(uid);

	if(!hospitalDB){
		return res.status(404).json({
			ok: false,
			msg:'No existe Hospital por ese ID'
		});
	}
	await Hospital.findByIdAndDelete(uid);
	res.json({
		ok: true,
		msg: 'Hospital eliminado'
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
	getHospitales,
	crearHospital,
	actualizarHospital,
	borrarHospital
}