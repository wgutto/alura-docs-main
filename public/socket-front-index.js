import { inserirLinkDocumento } from "./index.js";

const socket = io();

socket.emit("obter_documentos", (documentos) => {
  documentos.forEach((documento) => {
    inserirLinkDocumento(documento.nome);
  })
});

const emitirAdicionarDocumento = (nomeDocumento) => {
  socket.emit("adicionar_documento", nomeDocumento)
}

socket.on("documento_adicionado", (nomeDocumento) => {
  inserirLinkDocumento(nomeDocumento);
})

socket.on("documento_existe", (nomeDocumento) => {
  alert(`O documento ${nomeDocumento} já existe`);
})

export { emitirAdicionarDocumento };