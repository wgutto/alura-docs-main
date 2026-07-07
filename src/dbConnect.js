import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri)

let documentosColecao;

try {
  await client.connect();

  const db = client.db("alura-websockets");
  documentosColecao = db.collection("documentos");

  console.log("Conexão com o MongoDB estabelecida com sucesso!");
} catch (error) {
  console.error("Erro ao conectar ao MongoDB:", error);
}

export { documentosColecao };