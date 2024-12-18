const mongoose = require('mongoose')

const conectarDB = async () => {
    try {

        await mongoose.connect('mongodb://127.0.0.1:27017/TagliatoreDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Conexión Exitosa a Mongo DB');

    } catch(error){
        console.log('Error al conectarse a MongoDB:', error)
        process.exit(1)
    }
}

module.exports = conectarDB
