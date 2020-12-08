const {Schema, model} =  require('mongoose');

const comercianteSchema =  Schema({
	user_tienda: {
		unique: true,
		type: String,
		required: [true, 'El usuario de la tienda es necesario']
	},
	nombre_tienda: {
		type: String,
		required: false,
	},
	
	ruc: {
		type: Number,
		unique: true,
		required: [true, 'El ruc  es necesario']
	},
	email: {
		type: String,
		unique: true,
		required: [true, 'El correo es necesario']
	},
	img: {
		type: String,
		required: false
	},
	estado: {
		type: Boolean,
		default: true
	},
	role: {
		type: String,
		default:'COMERCIANTE_ROLE',
		
	},
	
	direccion_tienda:{
		type: String,
		required: true
	},
	
	pedidos:{
		required: false,
		type:Schema.Types.ObjectId,
		ref: 'Pedidos'
	}
});



module.exports = model('Comerciante', comercianteSchema);