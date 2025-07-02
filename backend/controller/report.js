const connectToDatabase = require('../database/dbConnection');
const { ObjectId } = require('mongodb');

// Função auxiliar para validar e converter para ObjectId
const toObjectId = (id) => {
    if (ObjectId.isValid(id)) {
        return new ObjectId(id);
    } else {
        throw new Error('ID inválido');
    }
};

// Criar um novo relatório
exports.createReport = async (userId, reportData) => {
    try {
        // Converte o userId para ObjectId
        const userObjectId = toObjectId(userId);

        // Verifica se o campo de data de criação já existe, caso contrário, adiciona
        const reportToInsert = {
            ...reportData,
            userId: userObjectId,
            data_criacao: reportData.data_criacao || new Date()
        };

        const db = await connectToDatabase();
        const result = await db.collection('reports').insertOne(reportToInsert);

        // Retorna o relatório recém-criado
        return { _id: result.insertedId, userId: userObjectId, ...reportToInsert };
    } catch (error) {
        throw new Error(error.message);
    }
};

// Obter todos os relatórios de um usuário
exports.getAllReportsByUser = async (userId) => {
    try {
        const userObjectId = toObjectId(userId);

        const db = await connectToDatabase();
        const reports = await db.collection('reports').find({ userId: userObjectId }).toArray();

        if (reports.length === 0) {
            return { message: 'Nenhum relatório encontrado para este usuário' };
        }

        return reports;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Obter um relatório específico por ID
exports.getReportById = async (reportId) => {
    try {
        const reportObjectId = toObjectId(reportId);

        const db = await connectToDatabase();
        const report = await db.collection('reports').findOne({ _id: reportObjectId });

        if (!report) {
            throw new Error('Relatório não encontrado');
        }

        return report;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Atualizar um relatório por ID
exports.updateReportById = async (reportId, reportData) => {
    try {
        const reportObjectId = toObjectId(reportId);

        // Atualiza a data de modificação
        const updatedData = {
            ...reportData,
            data_atualizacao: new Date()
        };

        const db = await connectToDatabase();
        const result = await db.collection('reports').updateOne(
            { _id: reportObjectId },
            { $set: updatedData }
        );

        if (result.matchedCount === 0) {
            throw new Error('Relatório não encontrado');
        }

        return { message: 'Relatório atualizado com sucesso', _id: reportObjectId, ...updatedData };
    } catch (error) {
        throw new Error(error.message);
    }
};

// Excluir um relatório por ID e retornar o relatório excluído
exports.deleteReportById = async (reportId) => {
    try {
        const reportObjectId = toObjectId(reportId);

        const db = await connectToDatabase();

        // Encontrar o relatório antes de excluí-lo
        const report = await db.collection('reports').findOne({ _id: reportObjectId });
        if (!report) {
            throw new Error('Relatório não encontrado');
        }

        const result = await db.collection('reports').deleteOne({ _id: reportObjectId });

        if (result.deletedCount === 0) {
            throw new Error('Erro ao excluir o relatório');
        }

        // Retorna o relatório excluído junto com a mensagem de sucesso
        return {
            message: 'Relatório excluído com sucesso',
            deletedReport: report
        };
    } catch (error) {
        throw new Error(error.message);
    }
};
