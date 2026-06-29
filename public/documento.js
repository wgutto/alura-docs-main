const socket = io();

const textoEditor = document.getElementById("editor-texto");

// O evento "keyup" é acionado sempre que o usuário solta uma tecla enquanto digita no campo de texto. Quando isso acontece, o valor atual do campo de texto é enviado para o servidor usando o socket.emit, com o evento "texto_editor" e o valor do campo como dados.
textoEditor.addEventListener("keyup", () => {
  socket.emit("texto_editor", textoEditor.value);
});

socket.on("texto_editor_clientes", (texto) => {
    textoEditor.value = texto;
  })