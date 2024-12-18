const Orden = require('../models/Orden');
const Platillo = require('../models/Platillo');


exports.crearOrden = async (req, res) => {
    
    try {
        // const { idMesa, platosSeleccionados } = req.body;

        // Validar que el ID del platillo sea válido
        // const platillo = await Platillo.findById(idPlatillo);
        // if (!platillo) {
        //     return res.status(400).json({ msg: `El platillo con ID ${idPlatillo} no es válido` });
        // }

        // Calcular el total
        // const total = platillo.precio * cantidad;


        const { idMesa, platosSeleccionados } = req.body;

        let total = 0;
        let platosConNombre = [];
        
        for (const item of platosSeleccionados) {
            const { idPlatillo, cantidad } = item;
        
            // Validar que el ID del platillo sea válido
            const platillo = await Platillo.findById(idPlatillo);
            if (!platillo) {
                return res.status(400).json({ msg: `El platillo con ID ${idPlatillo} no es válido` });
            }
        
            // Calcular el total para este platillo
            total += platillo.precio * cantidad;

            // Agregar el platillo con nombre al array
            platosConNombre.push({
                idPlatillo: idPlatillo,
                nombre: platillo.nombre,
                cantidad: cantidad
            });
        }
        
        // Aquí puedes manejar el total calculado
        console.log(`El total para la mesa ${idMesa} es ${total}`);
        
        
        // Crear la orden
        const nuevaOrden = new Orden({ idMesa, platosSeleccionados:platosConNombre, total });
        const resultado = await nuevaOrden.save();

        console.log('Orden guardada correctamente:', resultado);
        res.status(201).json({ msg: 'Orden creada exitosamente', orden: resultado });
    } catch (error) {
        console.error('Error al crear la orden:', error);
        res.status(500).json({ msg: 'Error al crear la orden' });
    }
};

// Obtener ordenes
exports.obtenerOrdenes = async (req, res) => {
    try {
        const ordenes = await Orden.find()
        return res.status(200).json(ordenes)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ msg: 'Error al obtener los ordenes' })
    }
}



exports.obtenerOrdenPorMesa = async (req, res) => {
    try {
        const { idMesa } = req.params;
        const orden = await Orden.findOne({ idMesa });

        if (!orden) {
            return res.status(404).json({ msg: 'No se encontró una orden para la mesa especificada' });
        }

        res.status(200).json(orden);
    } catch (error) {
        console.error('Error al obtener la orden:', error);
        res.status(500).json({ msg: 'Error al obtener la orden' });
    }
};


exports.actualizarOrden = async (req, res) => {
    try {
        const { id } = req.params;
        const { idPlatillo, cantidad, estado } = req.body;

        const orden = await Orden.findById(id);
        if (!orden) {
            return res.status(404).json({ msg: 'Orden no encontrada' });
        }

        if (idPlatillo) {
            const platillo = await Platillo.findById(idPlatillo);
            if (!platillo) {
                return res.status(400).json({ msg: `El platillo con ID ${idPlatillo} no es válido` });
            }
            orden.idPlatillo = idPlatillo;
            orden.total = platillo.precio * (cantidad || orden.cantidad);
        }

        if (cantidad) {
            orden.cantidad = cantidad;
            const platillo = await Platillo.findById(orden.idPlatillo);
            orden.total = platillo.precio * cantidad;
        }

        if (estado) {
            orden.estado = estado;
        }

        await orden.save();
        res.status(200).json({ msg: 'Orden actualizada exitosamente', orden });
    } catch (error) {
        console.error('Error al actualizar la orden:', error);
        res.status(500).json({ msg: 'Error al actualizar la orden' });
    }
};



exports.eliminarOrden = async (req, res) => {
    try {
        const { id } = req.params; // ID de la orden a eliminar

        // Buscar y eliminar la orden por su ID
        const orden = await Orden.findByIdAndDelete(id);

        if (!orden) {
            return res.status(404).json({ msg: 'Orden no encontrada' });
        }

        res.status(200).json({ msg: 'Orden eliminada exitosamente', orden });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar la orden' });
    }
};