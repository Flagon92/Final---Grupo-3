const express = require('express');
const conectarDB = require('./config/db');
const config = require('./config/global');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

conectarDB();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use('/api/platillos', require('./routes/platillo'));
app.use('/api/meseros', require('./routes/mesero'));
app.use('/api/categorias', require('./routes/categoria'));
app.use('/api/clientes', require('./routes/clientes'));
app.use('/api/ordenes', require('./routes/orden'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/uploads', require('./routes/uploads'));

const users = {};

const UPLOAD_DIR = path.join(process.cwd(), 'upload');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');

  let username;
  
  var buffer;


  socket.on('createUser', (room ,name, fileName, imageData) => {


    const filePath = path.join(UPLOAD_DIR, fileName);

    buffer = Buffer.from(imageData, 'base64');
    fs.writeFile(filePath, buffer, (err) => {
      if (err) {
        console.error('Error al guardar la imagen:', err);
        socket.emit('upload-status', { success: false, message: 'Error al guardar la imagen' });
        return;
      }
      console.log('Imagen guardada en:', filePath);
      socket.emit('upload-status', { success: true, message: 'Imagen subida exitosamente' });
    })

    if (users[name]) {
      socket.emit('userError', 'El nombre de usuario ya existe.')
    } else {
      username = name
      users[name] = socket.id
      socket.emit('userCreated', `Usuario ${username} creado con éxito.`)
      console.log(`Usuario creado: ${username}`)
    }

    socket.join(room)
    socket.room = room
  })

  socket.on('chat', (msg) => {

    const bufferIMG = buffer.toString('base64')

    io.to(socket.room).emit('chat', { user: username, message: msg, dataImg: bufferIMG })
    console.log(`Usuario:${username} - Mensaje: ${msg}`)
  })

  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
  })
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve('client/index.html'));
});

server.listen(config.port, () => {
  console.log(`El servidor está corriendo en el puerto ${config.port}`);
});
