import { documentosColecao } from "./dbConnect.js";

const obterDocumentos = () => {
  const documentos = documentosColecao.find().toArray();

  return documentos;
}

const adicionarDocumento = (nomeDocumento) => {
  const documento = {
    nome: nomeDocumento,
    texto: ""
  }

  const resultado = documentosColecao.insertOne(documento);

  return resultado;
}

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

const excluirDocumento = (nomeDocumento) => {
  const resultado = documentosColecao.deleteOne({ nome: nomeDocumento });

  return resultado;
}

export { encontrarDocumento, atualizaDocumento, obterDocumentos, adicionarDocumento, excluirDocumento };