const {Schema, model} =  require('mongoose');

const HospitalSchema =  Schema({
	nombre: {
		type: String,
		required: [true, 'El nombre es necesario']
	},
	img: {
		type: String,
		required: false
	},
	estado: {
		type: Boolean,
		default: true
	},
	usuario:{
		require: true,
		type:Schema.Types.ObjectId,
		ref: 'Usuario'
	}
}, {collection: 'hospitales'});

// aqui se extraer la informacion que no quieres que regrese en la respuesta
HospitalSchema.method('toJSON', function(){
	const {__v, ...object} = this.toObject();
	return object;
})

module.exports = model('Hospital', HospitalSchema);