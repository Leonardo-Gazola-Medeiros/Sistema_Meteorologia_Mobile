const { MongoClient } = require('mongodb');
const initialInserts = require('./dbInsert'); // Dados que populam as coleções

const uri = "mongodb+srv://fatec:fatec@fullstack.pt0hp.mongodb.net/?retryWrites=true&w=majority&appName=fullstack"; // ENDEREÇO DEFAULT DO BANCO DE DADOS MONGODB
const dbName = 'api5'; // NOME DO BANCO DE DADOS

const connectMongoDB = async () => {
    const client = new MongoClient(uri);

    try {
        // CONECTA AO MONGO DB
        await client.connect();
        console.log("Conectado ao MongoDB!");

        // SELECIONA O BANCO DE DADOS
        const db = client.db(dbName);

        // VERIFICAÇÃO DAS COLEÇÕES EXISTENTES
        const collections = await db.listCollections().toArray();
        const collectionNames = collections.map(col => col.name);

        // SE O BANCO EXISTIR (OU SE HOUVER COLEÇÕES), REMOVER E CRIAR DO ZERO
        if (collectionNames.length > 0) {
            console.log(`Banco de dados '${dbName}' já existe. Removendo...`);
            await db.dropDatabase(); // REMOVE O BANCO DE DADOS
            console.log(`Banco de dados '${dbName}' removido com sucesso.`);
        }

        // INSERIR DADOS NAS COLEÇÕES
        for (const collectionName of Object.keys(initialInserts)) {
            const insertData = initialInserts[collectionName];
            if (insertData.length > 0) {
                await db.collection(collectionName).insertMany(insertData);
                console.log(`Dados inseridos na coleção ${collectionName} com sucesso`);
            }
        }

        console.log("Estrutura padrão do banco de dados criada e dados iniciais inseridos");
    } catch (err) {
        console.error("Erro ao conectar ou criar banco de dados:", err);
    } finally {
        // FECHA A CONEXÃO APÓS O PROCESSO
        await client.close();
    }
};

// FUNÇÃO INICIAL PARA CONECTAR E POPULAR O BANCO
connectMongoDB();
