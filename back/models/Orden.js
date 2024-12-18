const { Schema, model } = require('mongoose');

const ordenSchema = new Schema({
    idMesa: { type: String, required: true }, 
    platosSeleccionados: { type: [], required: true }, 
    total: { type: Number, required: true },
    estado: { type: String, enum: ['Pendiente', 'Entregado', 'Cancelado'], default: 'Pendiente' },
    fecha: { type: Date, default: Date.now }
}, {
    timestamps: true // Agrega createdAt y updatedAt automáticamente
});

module.exports = model('Orden', ordenSchema);
    