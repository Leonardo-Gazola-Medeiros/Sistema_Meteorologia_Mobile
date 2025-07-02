const connectToDatabase = require('../database/dbConnection');
const { ObjectId } = require('mongodb');

// Função auxiliar para validar ObjectId
const isValidObjectId = (id) => {
    return id && ObjectId.isValid(id) && (String(new ObjectId(id)) === id);
};

// Criar uma nova notificação para um ponto
exports.createNotification = async (userId, pointId, notificationData) => {
    try {
        if (!isValidObjectId(userId) || !isValidObjectId(pointId)) {
            throw new Error('ID de usuário ou ponto inválido');
        }

        // Atribuir um ObjectId à nova notificação
        notificationData._id = new ObjectId(); // Gera um ID único para a notificação

        const db = await connectToDatabase();
        const result = await db.collection('usuarios').updateOne(
            { _id: new ObjectId(userId), "pontos._id": new ObjectId(pointId) },
            { $push: { "pontos.$.notificacoes": notificationData } }
        );

        if (result.matchedCount === 0) {
            throw new Error('Usuário ou ponto não encontrado');
        }

        // Retornar a notificação criada
        return notificationData;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Obter todas as notificações de um ponto
exports.getAllNotificationsByPoint = async (userId, pointId) => {
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
            throw new Error('Usuário ou ponto não encontrado');
        }

        return user.pontos[0].notificacoes || [];
    } catch (error) {
        throw new Error(error.message);
    }
};



// Obter uma notificação específica por ID
exports.getNotificationById = async (userId, pointId, notificationId) => {
    try {
        if (!isValidObjectId(userId) || !isValidObjectId(pointId) || !isValidObjectId(notificationId)) {
            throw new Error('ID de usuário, ponto ou notificação inválido');
        }

        const db = await connectToDatabase();

        // Busca o documento do usuário
        const user = await db.collection('usuarios').findOne(
            { _id: new ObjectId(userId), "pontos._id": new ObjectId(pointId) }
        );

        if (!user) {
            throw new Error('Usuário ou ponto não encontrado');
        }

        // Localiza o ponto e a notificação
        const point = user.pontos.find(p => p._id.toString() === pointId);
        if (!point) throw new Error('Ponto não encontrado');

        const notification = point.notificacoes.find(n => n._id.toString() === notificationId);
        if (!notification) {
            throw new Error('Notificação não encontrada');
        }

        // Retorna a notificação encontrada
        return notification;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Atualizar uma notificação por ID sem o uso de $
exports.updateNotificationById = async (userId, pointId, notificationId, notificationData) => {
    try {
        if (!isValidObjectId(userId) || !isValidObjectId(pointId) || !isValidObjectId(notificationId)) {
            throw new Error('ID de usuário, ponto ou notificação inválido');
        }

        const db = await connectToDatabase();

        // Busca o documento do usuário
        const user = await db.collection('usuarios').findOne(
            { _id: new ObjectId(userId), "pontos._id": new ObjectId(pointId) }
        );

        if (!user) {
            throw new Error('Usuário ou ponto não encontrado');
        }

        // Localiza o ponto e a notificação
        const point = user.pontos.find(p => p._id.toString() === pointId);
        if (!point) throw new Error('Ponto não encontrado');

        const notificationIndex = point.notificacoes.findIndex(n => n._id.toString() === notificationId);
        if (notificationIndex === -1) throw new Error('Notificação não encontrada');

        // Atualiza a notificação
        point.notificacoes[notificationIndex] = { ...notificationData, _id: new ObjectId(notificationId) };

        // Atualiza o documento no banco de dados
        const result = await db.collection('usuarios').updateOne(
            { _id: new ObjectId(userId), "pontos._id": new ObjectId(pointId) },
            { $set: { "pontos.$.notificacoes": point.notificacoes } }
        );

        if (result.matchedCount === 0) {
            throw new Error('Notificação não encontrada');
        }

        return { ...notificationData, _id: new ObjectId(notificationId) };
    } catch (error) {
        throw new Error(error.message);
    }
};

// Excluir uma notificação por ID e retornar a notificação excluída
exports.deleteNotificationById = async (userId, pointId, notificationId) => {
    try {
        if (!isValidObjectId(userId) || !isValidObjectId(pointId) || !isValidObjectId(notificationId)) {
            throw new Error('ID de usuário, ponto ou notificação inválido');
        }

        const db = await connectToDatabase();

        // Primeiro, encontre o ponto e a notificação
        const user = await db.collection('usuarios').findOne(
            { _id: new ObjectId(userId), "pontos._id": new ObjectId(pointId) }
        );

        if (!user) {
            throw new Error('Usuário ou ponto não encontrado');
        }

        const point = user.pontos.find(p => p._id.toString() === pointId);
        if (!point) throw new Error('Ponto não encontrado');

        const notificationIndex = point.notificacoes.findIndex(n => n._id.toString() === notificationId);
        if (notificationIndex === -1) throw new Error('Notificação não encontrada');

        const notificationToDelete = point.notificacoes[notificationIndex];

        // Remove a notificação do array
        point.notificacoes.splice(notificationIndex, 1);

        // Atualiza o documento no banco de dados
        const result = await db.collection('usuarios').updateOne(
            { _id: new ObjectId(userId), "pontos._id": new ObjectId(pointId) },
            { $set: { "pontos.$.notificacoes": point.notificacoes } }
        );

        if (result.modifiedCount === 0) {
            throw new Error('Notificação não encontrada ou já excluída');
        }

        // Retorna a notificação excluída
        return { message: 'Notificação excluída com sucesso', notificationToDelete};

    } catch (error) {
        throw new Error(error.message);
    }
};
