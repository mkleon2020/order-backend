const {Schema, model} =  require('mongoose');

const ListaSchema =  Schema({
	titulo: {
		type: String,
		required: [true, 'El titulo es necesario']
	},
	name_product: {
		type: String,
		required: [true, 'El nombre del producto es necesario']
	},
	cantidad: {
		type: Number,
		required: [true, 'La cantidad es necesaria']
	},
	date: {
		type: Date,
		required: [true, 'La fecha es necesaria']
	},
	
	usuario:{
		require: true,
		type:Schema.Types.ObjectId,
		ref: 'Usuario'
	}
});

// aqui se extraer la informacion que no quieres que regrese en la respuesta
ListaSchema.method('toJSON', function(){
	const {__v, ...object} = this.toObject();
	return object;
})

module.exports = model('Lista', ListaSchema);