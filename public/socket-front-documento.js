import { receberTextoEditor } from "./documento.js";

// O socket é criado usando a função io() do Socket.IO. Ele estabelece uma conexão com o servidor e permite enviar e receber eventos em tempo real.
const socket = io();

// A função emitirTextoEditor é exportada para ser usada em outros módulos. Ela envia o valor do texto do editor para o servidor usando o evento "texto_editor". O valor do texto é passado como argumento para a função.
export const emitirTextoEditor = (texto) => {
  socket.emit("texto_editor", texto);
}

// O socket.on é usado para ouvir eventos enviados pelo servidor. Neste caso, ele está ouvindo o evento "texto_editor_clientes". Quando esse evento é recebido, a função de callback é executada, e o valor do texto enviado pelo servidor é passado como argumento para a função receberTextoEditor.
socket.on("texto_editor_clientes", (texto) => {
  receberTextoEditor(texto);
})