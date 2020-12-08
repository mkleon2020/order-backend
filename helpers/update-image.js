
const fs = require('fs');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const deleteImage = (path) => {
	if(fs.existsSync(path)){
		// esto borra la imagen anterior
		fs.unlinkSync(path);
	}
}
let pathOld = '';
const updateImage = async (type,id,nombreArchivo) => {
	switch (type) {
		case 'medicos':
			const medico = await Medico.findById(id);
			if(!medico){
				console.log('No es medico por id');
				return false
			}
			 pathOld = `./uploads/medicos/${medico.img}`;
			deleteImage(pathOld);
			medico.img = nombreArchivo;
			await medico.save();
			return true;
		break;
		case 'hospitales':
			const hospital = await Hospital.findById(id);
			if(!hospital){
				console.log('No es hospital por id');
				return false
			}
			 pathOld = `./uploads/hospitales/${hospital.img}`;
			deleteImage(pathOld);
			hospital.img = nombreArchivo;
			await hospital.save();
			return true;
		break;
		case 'usuarios':
			const usuario = await Usuario.findById(id);
			if(!usuario){
				console.log('No es usuario por id');
				return false
			}
			 pathOld = `./uploads/usuarios/${usuario.img}`;
			deleteImage(pathOld);
			usuario.img = nombreArchivo;
			await usuario.save();
			return true;
		break;

	}
}

module.exports = {
	updateImage
}