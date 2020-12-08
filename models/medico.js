const {Schema, model} =  require('mongoose');

const MedicoSchema =  Schema({
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
		required: true,
		type:Schema.Types.ObjectId,
		ref: 'Usuario'
	},
	hospital:{
		required: true,
		type:Schema.Types.ObjectId,
		ref: 'Hospital'
	}
});

// aqui se extraer la informacion que no quieres que regrese en la respuesta
MedicoSchema.method('toJSON', function(){
	const {__v, ...object} = this.toObject();
	return object;
})

module.exports = model('Medico', MedicoSchema);