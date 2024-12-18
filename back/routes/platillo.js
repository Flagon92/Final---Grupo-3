const express = require('express');
const router = express.Router();
const platilloController = require('../controllers/platilloController');

// Crear un nuevo platillo
router.post('/create', platilloController.crearPlatillo);

// Obtener todas los platillo
router.get('/listar', platilloController.obtenerPlatillos);

// Ruta para obtener un platillo por ID
router.get('/:id', platilloController.obtenerPlatilloPorId);

// Actualizar un platillo
router.put('/actualizar/:id', platilloController.actualizarPlatillo);

// Eliminar una platillo
router.delete('/eliminar/:id', platilloController.eliminarPlatillo);

module.exports = router;
