const { Schema, model } = require('mongoose')

// Definir el esquema de platillo
const platilloSchema = new Schema({
    nombre: { type: String, unique: true, required: true }, 
    descripcion: { type: String, required: true },
    ingredientes: { type: String, required: true},
    precio: {type: Number, required: true},
    urlIMG: {type: String, required: true},
}, {
    timestamps: true // Agrega automáticamente createdAt y updatedAt
})

platilloSchema.method('toJSON', function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});


// Crear el modelo a partir del esquema
module.exports = model('Platillos', platilloSchema)
