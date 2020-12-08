const {response} = require('express');
const Lista = require('../models/lista_model');

const crearLista = async(req, res = response) => {

	const uid = req.uid;
	const lista = new Lista({
		usuario:uid,
		...req.body
	});
	try {
		
		// Guardar lista
		const ListaDB = await lista.save();
		res.json({
			ok:true,
			lista:ListaDB,
		});
		
	} catch (error) {

		res.status(500).json({
			ok: false,
			msg: 'Hable con el administrador'
		})
		
	}

}





module.exports = {
	
	crearLista,
	
}