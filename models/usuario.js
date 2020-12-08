const {Schema, model} =  require('mongoose');

const usuarioSchema =  Schema({
	nombre: {
		type: String,
		required: [true, 'El nombre es necesario']
	},
	user: {
		type: String,
		unique: true,
		required: [true, 'El usuario es necesario']
	},
	email: {
		type: String,
		unique: true,
		required: [true, 'El correo es necesario']
	},
	password: {
		type: String,
		required: [true, 'la clave es obligatoria']
	},
	img: {
		type: String,
		required: false
	},
	
	role: {
		type: String,
		default:'USER_ROLE',
		
	},
	estado: {
		type: Boolean,
		default: true
	},
	google: {
		type: Boolean,
		default: false
	},
});

// aqui se extraer la informacion que no quieres que regrese en la respuesta
usuarioSchema.method('toJSON', function(){
	const {__v,_id,password, ...object} = this.toObject();
	object.uid = _id;
	return object;
})

module.exports = model('Usuario', usuarioSchema);