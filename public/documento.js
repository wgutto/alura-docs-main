import { emitirTextoEditor, selecionarDocumento } from "./socket-front-documento.js";

const textoEditor = document.getElementById("editor-texto");
const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get("nome");
document.getElementById("titulo-documento").textContent = nomeDocumento || "Documento sem titulo";

selecionarDocumento(nomeDocumento);

// O evento "keyup" é adicionado ao elemento de texto do editor. Sempre que o usuário solta uma tecla enquanto digita no editor, a função de callback é executada. Essa função chama a função emitirTextoEditor, passando o valor atual do texto do editor e o nome do documento como argumentos. Isso permite que o texto seja enviado para o servidor em tempo real.
textoEditor.addEventListener("keyup", () => {
  emitirTextoEditor({
    texto: textoEditor.value,
    nomeDocumento
  });
});

// A função receberTextoEditor é exportada para ser usada em outros módulos. Ela recebe o valor do texto enviado pelo servidor como argumento e atualiza o valor do elemento de texto do editor com esse valor.
export const atualizaTextoEditor = (texto) => {
  textoEditor.value = texto;
}