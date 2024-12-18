const jwt = require('jsonwebtoken')

const Mesero = require('../models/Mesero')
const config = require('../config/global')

exports.crearMesero = async (req, res) => {

    try{

        console.log(req.body);
        
        const { nomMesero, email, password, turno, activo} = req.body

        // Verifica si ya existe un mesero con el mismo email
        const meseroExistente = await Mesero.findOne({ email });
        if (meseroExistente) {
            return res.status(400).json({ message: 'El email ya está en uso' });
        }
        
        const mesero = new Mesero({
            nomMesero,
            email,
            password,
            turno,
            activo
        })

        mesero.password = await mesero.encryptPassword(mesero.password)

        await mesero.save()
        
        const token = jwt.sign({id: mesero._id}, config.secret, {
            expiresIn: 60 * 60 * 24
        })

        res.status(200).json({
            auth: true, 
            token,
            mesero
        })

    }catch(error){
        console.log(error)
        res.status(500).send('Error creando mesero.')
    }

}

exports.obtenerMeseroPorId = async (req, res) => {

    try {

        const { id } = req.params
        const { email, password } = req.body

        const mesero = await Mesero.findById(id)
        if (!mesero) {
            return res.status(404).json({ msg: 'mesero no encontrada' })
        }

        // if (!mesero.activo) {
        //     return res.status(403).send('El mesero está desactivado.');
        // }    

        return res.status(200).json({ msg: 'Información de mesero', mesero })


    }catch(error){
        console.log(error)
        res.status(500).send('Error al validar el mesero.')
    }
}

exports.listarMeseros = async (req, res) => {
    try {
        // Busca solo los meseros que están activos
        // const meseros = await Mesero.find({ activo: true });
        const meseros = await Mesero.find();

        // Verifica si no hay meseros activos
        if (meseros.length === 0) {
            return res.status(404).json({ message: 'No hay meseros activos para mostrar' });
        }

        // Devuelve los meseros activos
        res.json(meseros);
    } catch (error) {
        console.error('Error al listar los meseros:', error);
        res.status(500).json({ message: 'Error al listar los meseros' });
    }
};

exports.actualizarMesero = async (req, res) => {
    try {
        const { id } = req.params; // Obtén el id de los parámetros de la ruta
        const { password } = req.body; // Campos a actualizar

        const mesero = await Mesero.findById(id)
        if (!mesero) {
            return res.status(409).json({ msg: 'Mesero no encontrado' })
        }

        if (!password) {
            delete req.body.password;

        } else {
            // encriptar el nuevo password que viene del req.body
            req.body.password = await mesero.encryptPassword(password);
        }


        // update
        const meseroUpdated = await Mesero.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json({
            ok: true,
            msg: 'Mesero actualizado exitosamente',
            cliente: meseroUpdated
        });

    } catch (error) {
        console.error('Error al actualizar el mesero:', error);
        res.status(500).json({ message: 'Error en el servidor al actualizar el mesero' });
    }
};

exports.eliminarMesero = async (req, res) => {
    try {
        const { id } = req.params; // Obtén el email de los parámetros de la ruta
        
        // Busca el mesero por id
        const mesero = await Mesero.findById(id);

        if (!mesero) {
            return res.status(404).json({ message: 'El mesero no existe' });
        }

        // Verifica si el mesero ya está inactivo
        // if (!mesero.activo) {
        //     return res.status(400).json({ message: 'El mesero ya está desactivado' });
        // }

        // Cambia el estado de "activo" a false
        mesero.activo = false;
        await Mesero.findByIdAndDelete(id);


        res.status(200).json({ message: 'Mesero eliminado correctamente (lógica)' });
    } catch (error) {
        console.error('Error al eliminar el mesero:', error);
        res.status(500).json({ message: 'Error en el servidor al eliminar el mesero' });
    }
};
