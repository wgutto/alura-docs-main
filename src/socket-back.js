import "dotenv/config";
import io from "./servidor.js";
import { adicionarDocumento, atualizaDocumento, encontrarDocumento, excluirDocumento, obterDocumentos } from "./documentosDb.js";

// O io.on é usado para ouvir eventos de conexão de clientes. Quando um novo cliente se conecta, a função de callback é executada, e o ID do cliente conectado é registrado no console.
io.on("connection", (socket) => {

  socket.on("obter_documentos", async (devolverDocumentos) => {
    const documentos = await obterDocumentos();

    devolverDocumentos(documentos);
  })

  socket.on("adicionar_documento", async (nomeDocumento) => {
    const documentoExiste = await encontrarDocumento(nomeDocumento);

    if (documentoExiste) {
      socket.emit("documento_existe", nomeDocumento);
    } else {
      const resultado = await adicionarDocumento(nomeDocumento);

      if (resultado.acknowledged) {
        io.emit("documento_adicionado", nomeDocumento);
      }
    }
  })

  // O socket.on é usado para ouvir eventos enviados pelo cliente. Neste caso, ele está ouvindo o evento "selecionar_documento". Quando esse evento é recebido, a função de callback é executada, e o nome do documento selecionado e uma função de callback (devolverTexto) são passados como argumentos. A função encontrarDocumento é chamada para encontrar o documento correspondente ao nome fornecido. Se o documento for encontrado, a função devolverTexto é chamada com o texto do documento como argumento, permitindo que o cliente receba o texto inicial do documento selecionado. Em seguida, o cliente é adicionado a uma sala específica usando socket.join(nomeDocumento), permitindo que ele receba atualizações em tempo real relacionadas a esse documento.
  socket.on("selecionar_documento", async (nomeDocumento, devolverTexto) => {
    const documento = await encontrarDocumento(nomeDocumento);

    if (documento) {
      devolverTexto(documento.texto);
    }

    socket.join(nomeDocumento);
  })

  // O socket.on é usado para ouvir eventos enviados pelo cliente. Neste caso, ele está ouvindo o evento "texto_editor". Quando esse evento é recebido, a função de callback é executada, e o valor do texto enviado pelo cliente e o nome do documento são passados como argumentos. Em seguida, o servidor emite o evento "texto_editor_clientes" para todos os clientes na mesma sala (ou seja, todos os clientes que estão editando o mesmo documento), enviando o valor do texto atualizado.
  socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
    const atualizacao = await atualizaDocumento(nomeDocumento, texto);

    if (atualizacao.mofiedCount) {
      socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
    }
  })

  socket.on("excluir_documento", async (nomeDocumento) => {
    const resultado = await excluirDocumento(nomeDocumento);

    if (resultado.deletedCount) {
      io.emit("documento_excluido", nomeDocumento);
    }
  })
})