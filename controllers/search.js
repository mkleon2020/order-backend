const {response} = require('express');
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const getSearch = async(req, res = response) => {
	const search = req.params.search;
	const regex = new RegExp(search,'i');

	const [usuarios,hospitales,medicos] = await Promise.all([
		Usuario.find({nombre:regex}),
		Hospital.find({nombre:regex}),
		Medico.find({nombre:regex}),
	]);
	res.json({
		ok:true,
		usuarios,
		hospitales,
		medicos
	});
}
const getDocumentCollection = async(req, res = response) => {
	const tabla = req.params.tabla;
	const busqueda = req.params.busqueda;
	const regex = new RegExp(busqueda,'i');
	let data;
	switch (tabla) {
		case 'medicos':
			data =  await Medico.find({nombre:regex})
			.populate('usuario','nombre')
			.populate('hospital','nombre');
		break;
		case 'hospitales':
			data = await Hospital.find({nombre:regex})
			.populate('usuario','nombre');
		break;
		case 'usuarios':
			data = await Usuario.find({nombre:regex});
		
		break;
	
		default:
		return	res.status(400).json({
				ok:false,
				msg:'La tabla tiene que ser usuarios,medicos,hospitales'
			});
		
	
	}
	res.json({
		ok:true,
		resultados:data
	});
}

module.exports = {
	getSearch,
	getDocumentCollection
	
}