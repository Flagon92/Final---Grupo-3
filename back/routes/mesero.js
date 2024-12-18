const express = require('express')
const router = express.Router()
const meseroController = require('../controllers/meseroController')

router.post('/create', meseroController.crearMesero);
router.get('/listar', meseroController.listarMeseros);
router.get('/:id', meseroController.obtenerMeseroPorId);
router.put('/actualizar/:id', meseroController.actualizarMesero);
router.delete('/eliminar/:id', meseroController.eliminarMesero);


module.exports = router