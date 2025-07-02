const connectToDatabase = require('../database/dbConnection');
const { ObjectId } = require('mongodb');

// Função auxiliar para validar ObjectId
const isValidObjectId = (id) => {
    return ObjectId.isValid(id) && (String(new ObjectId(id)) === id);
};

// Criar um usuário
exports.createUser = async (userData) => {
    try {
        const db = await connectToDatabase();
        const result = await db.collection('usuarios').insertOne(userData);
        
        // Retorna o usuário criado, incluindo o _id gerado
        const createdUser = await db.collection('usuarios').findOne({ _id: result.insertedId });
        return createdUser;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Obter todos os usuários
exports.getAllUsers = async () => {
    try {
        const db = await connectToDatabase();
        const users = await db.collection('usuarios').find({}).toArray();
        return users;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Obter um usuário por ID
exports.getUserById = async (userId) => {
    try {
        if (!isValidObjectId(userId)) {
            throw new Error('ID de usuário inválido');
        }

        const db = await connectToDatabase();
        const user = await db.collection('usuarios').findOne({ _id: new ObjectId(userId) });

        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Atualizar um usuário por ID
exports.updateUserById = async (userId, userData) => {
    try {
        if (!isValidObjectId(userId)) {
            throw new Error('ID de usuário inválido');
        }

        const db = await connectToDatabase();
        const result = await db.collection('usuarios').updateOne({ _id: new ObjectId(userId) }, { $set: userData });

        if (result.matchedCount === 0) {
            throw new Error('Usuário não encontrado');
        }

        // Retorna o documento atualizado
        const updatedUser = await db.collection('usuarios').findOne({ _id: new ObjectId(userId) });
        return updatedUser;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Excluir um usuário por ID e retornar o usuário excluído
exports.deleteUserById = async (userId) => {
    try {
        if (!isValidObjectId(userId)) {
            throw new Error('ID de usuário inválido');
        }

        const db = await connectToDatabase();

        // Primeiro, encontrar o usuário antes de excluí-lo
        const user = await db.collection('usuarios').findOne({ _id: new ObjectId(userId) });
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        // Excluir o usuário
        const result = await db.collection('usuarios').deleteOne({ _id: new ObjectId(userId) });

        if (result.deletedCount === 0) {
            throw new Error('Erro ao excluir o usuário');
        }

        // Retorna o usuário excluído junto com a mensagem de sucesso
        return {
            message: 'Usuário excluído com sucesso',
            deletedUser: user
        };
    } catch (error) {
        throw new Error(error.message);
    }
};
