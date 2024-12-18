const Categoria = require('../models/Categoria')

// Crear una nueva categoría
exports.crearCategoria = async (req, res) => {
    const { nombre, descripcion } = req.body

    try {
        const categoriaExistente = await Categoria.findOne({ nombre })
        if (categoriaExistente) {
            return res.status(400).json({ msg: 'La categoría ya existe' })
        }

        const nuevaCategoria = new Categoria({ nombre, descripcion })
        await nuevaCategoria.save()

        return res.status(201).json({ msg: 'Categoría creada exitosamente', categoria: nuevaCategoria })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ msg: 'Error al crear la categoría' })
    }
}

// Obtener categoria
exports.obtenerCategoriaPorId = async (req, res) => {
    const { id } = req.params; // Obtener el id del parámetro de la URL
  
    try {
        // Buscar el platillo por su id
        const categoria = await Categoria.findById(id);
  
        // Verificar si el platillo existe
        if (!categoria) {
            return res.status(404).json({ msg: 'Platillo no encontrado' });
        }
  
        return res.status(200).json(categoria); // Devolver el platillo encontrado
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error al obtener la categoria por ID' });
    }
  }

// Obtener todas las categorías
exports.obtenerCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find()
        return res.status(200).json(categorias)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ msg: 'Error al obtener las categorías' })
    }
}

// Actualizar una categoría
exports.actualizarCategoria = async (req, res) => {
    const { id } = req.params
    const { nombre, descripcion } = req.body

    try {
        const categoria = await Categoria.findById(id)
        if (!categoria) {
            return res.status(404).json({ msg: 'Categoría no encontrada' })
        }

        categoria.nombre = nombre || categoria.nombre
        categoria.descripcion = descripcion || categoria.descripcion

        await categoria.save()

        return res.status(200).json({ msg: 'Categoría actualizada exitosamente', categoria })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ msg: 'Error al actualizar la categoría' })
    }
}

// Eliminar una categoría
exports.eliminarCategoria = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar y eliminar la categoría por su ID
        const categoria = await Categoria.findByIdAndDelete(id);

        if (!categoria) {
            return res.status(404).json({ msg: "Categoría no encontrada" });
        }

        res.json({ msg: "Categoría eliminada exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Hubo un error en el servidor");
    }
};

