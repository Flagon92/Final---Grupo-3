const Platillo = require('../models/Platillo');

// Crear un nuevo platillo
exports.crearPlatillo = async (req, res) => {
    const { nombre, descripcion, ingredientes, precio, urlIMG } = req.body;

    console.log(req.body);
    

    try {
        const platilloExistente = await Platillo.findOne({ nombre });
        if (platilloExistente) {
            return res.status(400).json({ msg: 'El platillo ya existe' });
        }

        const nuevoPlatillo = new Platillo({ nombre, descripcion, ingredientes, precio, urlIMG });
        await nuevoPlatillo.save();

        return res.status(201).json({ msg: 'Platillo creado exitosamente', platillo: nuevoPlatillo });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error al crear el platillo' });
    }
};

// Obtener todos los platillos
exports.obtenerPlatillos = async (req, res) => {
    try {
        const platillos = await Platillo.find();
        return res.status(200).json(platillos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error al obtener los platillos' });
    }
};

// Actualizar un platillo
exports.actualizarPlatillo = async (req, res) => {

    console.log(req.body)
    const { id } = req.params;
    const { nombre, descripcion, ingredientes, precio, urlIMG } = req.body;

    try {
        const platillo = await Platillo.findById(id);
        if (!platillo) {
            return res.status(404).json({ msg: 'Platillo no encontrado' });
        }

        // platillo.nombre = nombre || platillo.nombre;
        // platillo.descripcion = descripcion || platillo.descripcion;
        // platillo.ingredientes = ingredientes || platillo.ingredientes;
        // platillo.precio = precio || platillo.precio;
        // platillo.urlImg = urlIMG || platillo.urlIMG;

        const userUpdated = await Platillo.findByIdAndUpdate(id, req.body, { new: true });

        // await platillo.save();

        return res.status(200).json({ msg: 'Platillo actualizado exitosamente', user: userUpdated });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error al actualizar el platillo' });
    }
};

// Eliminar un platillo
exports.eliminarPlatillo = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar y eliminar el platillo por su ID
        const platillo = await Platillo.findByIdAndDelete(id);

        if (!platillo) {
            return res.status(404).json({ msg: 'Platillo no encontrado' });
        }

        res.json({ msg: 'Platillo eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error en el servidor');
    }
};


exports.obtenerPlatilloPorId = async (req, res) => {
  const { id } = req.params; // Obtener el id del parámetro de la URL

  try {
      // Buscar el platillo por su id
      const platillo = await Platillo.findById(id);

      // Verificar si el platillo existe
      if (!platillo) {
          return res.status(404).json({ msg: 'Platillo no encontrado' });
      }

      return res.status(200).json(platillo); // Devolver el platillo encontrado
  } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Error al obtener el platillo' });
  }
}