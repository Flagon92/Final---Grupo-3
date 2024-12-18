const express = require('express');
const router = express.Router();
const ordenController = require('../controllers/ordenController');


router.post('/create', ordenController.crearOrden);

router.get('/listar', ordenController.obtenerOrdenes);

router.get('/mesa/:idMesa', ordenController.obtenerOrdenPorMesa);

router.put('/actualizar/:id', ordenController.actualizarOrden);

router.delete('/eliminar/:id', ordenController.eliminarOrden);

module.exports = router;