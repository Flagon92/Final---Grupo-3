const {Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const clienteSchema = new Schema({
    nombre: String,
    correo: { type: String, unique: true }, 
    telefono: { type: String, unique: true },
    dni: { type: String, unique: true },
})

clienteSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Cliente', clienteSchema)