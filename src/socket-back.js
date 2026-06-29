import io from "./servidor.js";

// O io.on é usado para ouvir eventos de conexão de clientes. Quando um novo cliente se conecta, a função de callback é executada, e o ID do cliente conectado é registrado no console.
io.on("connection", (socket) => {
  console.log("Novo cliente conectado ID:", socket.id);

  // O socket.on é usado para ouvir eventos específicos enviados pelo cliente. Neste caso, ele está ouvindo o evento "texto_editor". Quando esse evento é recebido, a função de callback é executada, e o valor do texto enviado pelo cliente é registrado no console.
  socket.on("texto_editor", (texto) => {
    socket.broadcast.emit("texto_editor_clientes", texto);
  })
})