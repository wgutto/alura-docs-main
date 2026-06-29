import io from "./servidor.js";


io.on("connection", (socket) => {
  console.log("Novo cliente conectado ID:", socket.id);
})