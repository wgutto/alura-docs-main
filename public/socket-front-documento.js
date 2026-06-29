import { atualizaTextoEditor } from "./documento.js";

// O socket é criado usando a função io() do Socket.IO. Ele estabelece uma conexão com o servidor e permite enviar e receber eventos em tempo real.
const socket = io();

export const selecionarDocumento = (nomeDocumento) => {
  socket.emit("selecionar_documento", nomeDocumento, (texto) => {
    atualizaTextoEditor(texto);
  });
}

// A função emitirTextoEditor é exportada para ser usada em outros módulos. Ela recebe o valor do texto do editor e o nome do documento como argumentos e envia esses valores para o servidor usando o evento "texto_editor".
export const emitirTextoEditor = (dados) => {
  socket.emit("texto_editor", dados);
}

// O socket.on é usado para ouvir eventos enviados pelo servidor. Neste caso, ele está ouvindo o evento "texto_editor_clientes". Quando esse evento é recebido, a função de callback é executada, e o valor do texto enviado pelo servidor é passado como argumento para a função receberTextoEditor.
socket.on("texto_editor_clientes", (texto) => {
  atualizaTextoEditor(texto);
})