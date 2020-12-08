const path = require('path');
const fs = require('fs');
const {response} = require('express');
const { v4: uuidv4 } = require('uuid');
const {updateImage} = require('../helpers/update-image');


const fileUpload = async(req, res = response) => {

	const type = req.params.type;
	const id = req.params.id;
	//validar tipo
	const tiposValidos = ['hospitales','medicos','usuarios'];
	if (!tiposValidos) {
		return res.status(400).json({
			ok: false,
			msg:'No es un medico,usuario u hospital (tipo)'
		});
	}
	// validar que exista un archivo
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).json({
			ok: false,
			msg:'No hay ningun archivo'
		});
	}
	// recojer la imagen
	const file = req.files.imagen;
	// extraer el formato (jpg o png)
	const nombreCortado = file.name.split('.');
	const extensionArchivo = nombreCortado[nombreCortado.length - 1];

	// validar extensiones
	const formatoPermitido = ['png','jpg','jpeg','gif'];
	if(!formatoPermitido.includes(extensionArchivo)){
		return res.status(400).json({
			ok: false,
			msg: 'Formato no permitido'
		});
	}
	//generar el nombre del archivo
	const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
	// path para guardar la imagen
	const path = `./uploads/${type}/${nombreArchivo}`;

	// Mover la imagen
	file.mv(path, (err) => {
		if (err){
			console.log(err);
			return res.status(500).json({
				ok:false,
				msg:'Error al mover la imagen'
			});
		}

		//Actualizar imagen
		updateImage(type,id,nombreArchivo);
		 
		res.json({
			ok:true,
			msg:'Archivo subido',
			nombreArchivo
		});
	  });
	

}


const getImage = (req, res = response) => {
	const type = req.params.type;
	const image = req.params.img;
	const pathimg = path.join(__dirname,`../uploads/${type}/${image}`);
	// imagen por defecto
	if(fs.existsSync(pathimg)){

		res.sendFile(pathimg);
	}else{
		const pathimg = path.join(__dirname,`../uploads/noimage.png`);
		res.sendFile(pathimg);
	}

}

module.exports = {
	fileUpload,
	getImage
}