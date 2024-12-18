const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

// Crear una nueva categoría
router.post('/create', categoriaController.crearCategoria);

// Obtener todas las categorías
router.get('/listar', categoriaController.obtenerCategorias);

// Consultar categoria por ID
router.get('/:id', categoriaController.obtenerCategoriaPorId);

// Actualizar una categoría
router.put('/actualizar/:id', categoriaController.actualizarCategoria);

// Eliminar una categoría
router.delete('/eliminar/:id', categoriaController.eliminarCategoria);

module.exports = router;
