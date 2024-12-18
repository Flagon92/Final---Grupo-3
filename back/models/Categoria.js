const { Schema, model } = require('mongoose')

// Definir el esquema de la categoría
const categoriaSchema = new Schema({
    nombre: { type: String, unique: true, required: true }, // Nombre de la categoría, único y obligatorio
    descripcion: { type: String, required: true } // Descripción de la categoría, obligatoria
}, {
    timestamps: true // Agrega automáticamente createdAt y updatedAt
})

categoriaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  

// Crear el modelo a partir del esquema
module.exports = model('Categoria', categoriaSchema)
