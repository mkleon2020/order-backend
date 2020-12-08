const {response} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const getUsuarios = async(req, res) => {
	const desde = Number(req.query.desde) || 0;

	//Promise ejecuta promesas simultaneas
	const [usuarios, total] = await Promise.all([
		Usuario.find({},'nombre email role google img')
		.skip(desde)
		.limit(5),

		Usuario.countDocuments()
	]);
	res.json({
		ok:true,
		usuarios,
		totalregistros:total
	});
}

const crearUsuario = async(req, res = response) => {

	const {email,password, user} = req.body;
	
	try {
		const existeEmail = await Usuario.findOne({email});
		const existeUser = await Usuario.findOne({user});
		
		if(existeEmail){
			return res.status(400).json({
				ok:false,
				msg:"El correo ya esta registrado"
			});
		}
		if(existeUser){
			return res.status(400).json({
				ok:false,
				msg:"El usuario ya esta registrado"
			});
		}
		const usuario = new Usuario(req.body);
		//Encriptar clave
		const salt = bcryptjs.genSaltSync();
		usuario.password = bcryptjs.hashSync(password,salt);
		// Guardar usuario
		await usuario.save();
		const token = await generarJWT(usuario.id);
		res.json({
			ok:true,
			usuario,
			token
		});
		
	} catch (error) {

		res.status(500).json({
			ok: false,
			msg: 'Error inesperado'
		})
		
	}

}

const actualizarUsuario = async(req, res = response) => {

	const uid = req.params.id;
try {
	const usuarioDB = await Usuario.findById(uid);

	if(!usuarioDB){
		return res.status(404).json({
			ok: false,
			msg:'No existe un usuario por  ese ID'
		});
	}
	
	//Actualizar
	// Aqui esta sacando  los campos q no quiere actualizar
	const {google,password,email, ...campos} = req.body;
	if(usuarioDB.email !== email){
		
		const existeEmail = await Usuario.findOne({email});
		if(existeEmail){
			return res.status(400).json({
				ok: false,
				msg: 'Ya existe un usuario con ese Email'
			});
		}
	}
	campos.email = email;
	const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos,{new:true});
	res.json({
		ok:true,
		usuario:usuarioActualizado
	});

	
} catch (error) {
	res.status(500).json({
		ok: false,
		msg: 'Error inesperado'
	});
}

}
const borrarUsuario = async(req, res = response) => {
	const uid = req.params.id;
	
	try {
		const usuarioDB = await Usuario.findById(uid);

	if(!usuarioDB){
		return res.status(404).json({
			ok: false,
			msg:'No existe un usuario por  ese ID'
		});
	}
	await Usuario.findByIdAndDelete(uid);
	res.json({
		ok: true,
		msg: 'Usuario eliminado'
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
	getUsuarios,
	crearUsuario,
	actualizarUsuario,
	borrarUsuario
}