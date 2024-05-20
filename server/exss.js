const express = require('express');
const app = express();
const { join } = require('node:path');

const { createServer } = require('node:http');
const { Server } = require('socket.io');

const server = createServer(app);
const { instrument } = require("@socket.io/admin-ui");

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://admin.socket.io"],
    credentials: true
  }
});

const userIo = io.of('/user');
// Custom io namespace
userIo.on("connection", (socket) => {
  console.log("Connected to user namespace with user " + socket.username);
})

userIo.use((socket, next) => {
  if (socket.handshake.auth.token) {
    socket.username = getUsernameFromToken(socket.handshake.auth.token)
    next();
  } else {
    next(new Error('Please send token'));
  }
})

function getUsernameFromToken(token) {
  return token
}

instrument(io, {
  auth: false,
  mode: "development"
})

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

// io.on('connection', (socket) => {
//   socket.on('chat-message', (message) => {
//     // io.emit("receive-message", message);
//     // hiển thị thông tin đến tất cả các user và cả người gửi tin nhắn
//     socket.broadcast.emit("receive-message", message);
//     // Hiển thị thông tin cho tất cả user TRỪ người gửi data
//   });
// });

io.on('connection', (socket) => {
  // Gửi thông tin đến một đối tượng cụ thể (private)
  socket.on('chat-message', (message, room) => {
    if (room === "") {
      socket.broadcast.emit("receive-message", message);
    } else {
      // Room được đặt do người dùng và unique 
      // to là phương thức kết nối đến những người có cùng room với nhau
      socket.to(room).emit("receive-message", message)
    }
  });

  socket.on('join-room', (room, cb) => {
    socket.join(room);
    cb(`joined ${room}`);
  })
  
  socket.on("ping", n => {
    console.log(n);
  })
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});