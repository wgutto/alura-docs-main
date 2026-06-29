import io from "./servidor.js";

// O io.on é usado para ouvir eventos de conexão de clientes. Quando um novo cliente se conecta ao servidor, a função de callback (socket) é executada, e o ID do socket do cliente é registrado no console.
io.on("connection", (socket) => {
  console.log("Novo cliente conectado ID:", socket.id);

  socket.on("texto_editor", (socket) => {
    console.log("Texto recebido do cliente:", socket);
  })
})