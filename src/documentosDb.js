import { documentosColecao } from "./dbConnect.js";

const encontrarDocumento = (nomeDocumento) => {
  const documento = documentosColecao.findOne({ nome: nomeDocumento });

  return documento;
}

const atualizaDocumento = (nomeDocumento, texto) => {
  const documento = documentosColecao.findOne({ nome: nomeDocumento });

  if(documento) {
    const atualizacao = documentosColecao.updateOne(
      { nome: nomeDocumento },
      { $set: { texto: texto } }
    );

    return atualizacao;
  }
}

export { encontrarDocumento, atualizaDocumento };