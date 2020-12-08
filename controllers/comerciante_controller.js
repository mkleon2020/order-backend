const {response} = require('express');
const Comerciante = require('../models/comerciante');
const getComerciantes = async(req, res) => {
	const desde = Number(req.query.desde) || 0;

	//Promise ejecuta promesas simultaneas
	const [comerciantes, total] = await Promise.all([
		Comerciante.find({},'nombre email role google img')
		.skip(desde)
		.limit(5),

		Comerciante.countDocuments()
	]);
	res.json({
		ok:true,
		comerciantes,
		totalregistros:total
	});
}

const crearComerciante = async(req, res = response) => {

	const {email,ruc,user_tienda} = req.body;
	
	
	try {
		const [existeEmail, existRuc, existUser] = await Promise.all([

			Comerciante.findOne({email}),
			Comerciante.findOne({ruc}),
			Comerciante.findOne({user_tienda}),

		]);
		
		if(existeEmail){
			return res.status(400).json({
				ok:false,
				msg:"El correo ya esta registrado"
			});
			
		}
		if(existRuc){
			return res.status(400).json({
				ok:false,
				msg:"El ruc ya esta registrado"
			});
			
		}
		if(existUser){
			return res.status(400).json({
				ok:false,
				msg:"El comerciante ya esta registrado"
			});
			
		}
		const comerciante = new Comerciante(req.body);
		
		// Guardar comerciante
		await comerciante.save();
		res.json({
			ok:true,
			comerciante,
		
		});
		
	} catch (error) {

		res.status(500).json({
			ok: false,
			msg: 'Error inesperado'
		})
		
	}

}

const actualizarComerciante = async(req, res = response) => {

	const uid = req.params.id;
try {
	const comercianteDB = await Comerciante.findById(uid);

	if(!comercianteDB){
		return res.status(404).json({
			ok: false,
			msg:'No existe un comerciante por  ese ID'
		});
	}
	
	//Actualizar
	// Aqui esta sacando  los campos q no quiere actualizar
	const {google,password,email, ...campos} = req.body;
	if(comercianteDB.email !== email){
		
		const existeEmail = await Comerciante.findOne({email});
		if(existeEmail){
			return res.status(400).json({
				ok: false,
				msg: 'Ya existe un comerciante con ese Email'
			});
		}
	}
	campos.email = email;
	const comcercianteActualizado = await Comerciante.findByIdAndUpdate(uid,campos,{new:true});
	res.json({
		ok:true,
		comerciante:comcercianteActualizado
	});

	
} catch (error) {
	res.status(500).json({
		ok: false,
		msg: 'Error inesperado'
	});
}

}
const borrarComerciante = async(req, res = response) => {
	const uid = req.params.id;
	
	try {
		const comercianteDB = await Comerciante.findById(uid);

	if(!comercianteDB){
		return res.status(404).json({
			ok: false,
			msg:'No existe un comerciante por  ese ID'
		});
	}
	await Comerciante.findByIdAndDelete(uid);
	res.json({
		ok: true,
		msg: 'comerciante eliminado'
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
	getComerciantes,
	crearComerciante,
	actualizarComerciante,
	borrarComerciante
}