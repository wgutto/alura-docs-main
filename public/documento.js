import { emitirTextoEditor } from "./socket-front-documento.js";

const textoEditor = document.getElementById("editor-texto");

// O evento "keyup" é adicionado ao elemento de texto do editor. Sempre que o usuário solta uma tecla enquanto digita no editor, a função de callback é executada. Dentro dessa função, o valor atual do texto do editor é obtido e passado como argumento para a função emitirTextoEditor, que envia o valor para o servidor.
textoEditor.addEventListener("keyup", () => {
  emitirTextoEditor(textoEditor.value);
});

// A função receberTextoEditor é exportada para ser usada em outros módulos. Ela recebe o valor do texto enviado pelo servidor como argumento e atualiza o valor do elemento de texto do editor com esse valor.
export const receberTextoEditor = (texto) => {
  textoEditor.value = texto;
}