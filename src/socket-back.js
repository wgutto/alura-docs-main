import io from "./servidor.js";

const documentos = [
  {
    nome: "JavaScript",
    texto: "texto inicial do documento JavaScript"
  },
  {
    nome: "Node.js",
    texto: "texto inicial do documento Node.js"
  },
  {
    nome: "Socket.io",
    texto: "texto inicial do documento Socket.IO"
  }
]

// O io.on é usado para ouvir eventos de conexão de clientes. Quando um novo cliente se conecta, a função de callback é executada, e o ID do cliente conectado é registrado no console.
io.on("connection", (socket) => {
  console.log("Novo cliente conectado ID:", socket.id);

  // O socket.on é usado para ouvir eventos enviados pelo cliente. Neste caso, ele está ouvindo o evento "selecionar_documento". Quando esse evento é recebido, a função de callback é executada, e o nome do documento selecionado e uma função de callback (devolverTexto) são passados como argumentos. A função encontrarDocumento é chamada para encontrar o documento correspondente ao nome fornecido. Se o documento for encontrado, a função devolverTexto é chamada com o texto do documento como argumento, permitindo que o cliente receba o texto inicial do documento selecionado. Em seguida, o cliente é adicionado a uma sala específica usando socket.join(nomeDocumento), permitindo que ele receba atualizações em tempo real relacionadas a esse documento.
  socket.on("selecionar_documento", (nomeDocumento, devolverTexto) => {
    const documento = encontrarDocumento(nomeDocumento);

    if(documento) {
      devolverTexto(documento.texto);
    }

    socket.join(nomeDocumento);
  })

  // O socket.on é usado para ouvir eventos enviados pelo cliente. Neste caso, ele está ouvindo o evento "texto_editor". Quando esse evento é recebido, a função de callback é executada, e o valor do texto enviado pelo cliente e o nome do documento são passados como argumentos. Em seguida, o servidor emite o evento "texto_editor_clientes" para todos os clientes na mesma sala (ou seja, todos os clientes que estão editando o mesmo documento), enviando o valor do texto atualizado.
  socket.on("texto_editor", ({ texto, nomeDocumento }) => {
    const documento = encontrarDocumento(nomeDocumento);

    if(documento) {
      documento.texto = texto;
    }

    socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
  })
})

const encontrarDocumento = (nomeDocumento) => {
  const documento = documentos.find(documento => documento.nome === nomeDocumento);

  return documento;
}