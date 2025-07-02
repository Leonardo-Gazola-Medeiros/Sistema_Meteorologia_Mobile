const connectToDatabase = require('../database/dbConnection');
const { ObjectId } = require('mongodb');

// Função auxiliar para validar ObjectId
const isValidObjectId = (id) => {
    return id && ObjectId.isValid(id) && (String(new ObjectId(id)) === id);
};

// Criar um novo ponto para o usuário
exports.createPoint = async (userId, pointData) => {
    try {
        if (!isValidObjectId(userId)) {
            throw new Error('ID de usuário inválido');
        }

        pointData._id = new ObjectId();

        const db = await connectToDatabase();
        const result = await db.collection('usuarios').updateOne(
            { _id: new ObjectId(userId) },
            { $push: { pontos: pointData } }
        );

        if (result.matchedCount === 0) {
            throw new Error('Usuário não encontrado');
        }

        return pointData;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Obter todos os pontos de um usuário
exports.getAllPointsByUser = async (userId) => {
    try {
        if (!isValidObjectId(userId)) {
            throw new Error('ID de usuário inválido');
        }

        const db = await connectToDatabase();
        const user = await db.collection('usuarios').findOne(
            { _id: new ObjectId(userId) },
            { projection: { pontos: 1 } }
        );

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        return user.pontos || [];
    } catch (error) {
        throw new Error(error.message);
    }
};

// Obter um ponto específico por ID
exports.getPointById = async (userId, pointId) => {
    try {
        if (!isValidObjectId(userId) || !isValidObjectId(pointId)) {
            throw new Error('ID de usuário ou ponto inválido');
        }

        const db = await connectToDatabase();
        const user = await db.collection('usuarios').findOne(
            { _id: new ObjectId(userId), "pontos._id": new ObjectId(pointId) },
            { projection: { "pontos.$": 1 } }
        );

        if (!user || !user.pontos || user.pontos.length === 0) {
            throw new Error('Ponto não encontrado');
        }

        return user.pontos[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

// Atualizar um ponto por ID
exports.updatePointById = async (userId, pointId, pointData) => {
    try {
        if (!isValidObjectId(userId) || !isValidObjectId(pointId)) {
            throw new Error('ID de usuário ou ponto inválido');
        }

        const db = await connectToDatabase();
        const result = await db.collection('usuarios').updateOne(
            { _id: new ObjectId(userId), "pontos._id": new ObjectId(pointId) },
            { $set: { "pontos.$": { ...pointData, _id: new ObjectId(pointId) } } }
        );

        if (result.matchedCount === 0) {
            throw new Error('Ponto não encontrado');
        }

        return { ...pointData, _id: new ObjectId(pointId) };
    } catch (error) {
        throw new Error(error.message);
    }
};

// Excluir um ponto por ID e retornar o ponto excluído
exports.deletePointById = async (userId, pointId) => {
    try {
        if (!isValidObjectId(userId) || !isValidObjectId(pointId)) {
            throw new Error('ID de usuário ou ponto inválido');
        }

        const db = await connectToDatabase();
        // Encontrar o ponto antes de excluí-lo
        const user = await db.collection('usuarios').findOne(
            { _id: new ObjectId(userId), "pontos._id": new ObjectId(pointId) },
            { projection: { "pontos.$": 1 } }
        );

        if (!user || !user.pontos || user.pontos.length === 0) {
            throw new Error('Ponto não encontrado');
        }

        const deletedPoint = user.pontos[0];

        // Excluir o ponto
        const result = await db.collection('usuarios').updateOne(
            { _id: new ObjectId(userId) },
            { $pull: { pontos: { _id: new ObjectId(pointId) } } }
        );

        if (result.modifiedCount === 0) {
            throw new Error('Ponto não encontrado ou já excluído');
        }

        return { message: 'Ponto excluído com sucesso', deletedPoint };
    } catch (error) {
        throw new Error(error.message);
    }
};
