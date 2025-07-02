const express = require('express');
const router = express.Router({ mergeParams: true });  // Habilita a propagação de parâmetros
const reportController = require('../controller/report');

// Criar um novo relatório para um usuário
router.post('/', async (req, res) => {
    try {
        const { userId } = req.params;  // userId será propagado corretamente agora
        const result = await reportController.createReport(userId, req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obter todos os relatórios de um usuário
router.get('/', async (req, res) => {
    try {
        const { userId } = req.params;  // userId propagado da rota principal
        const reports = await reportController.getAllReportsByUser(userId);
        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obter um relatório específico por ID
router.get('/:reportId', async (req, res) => {
    try {
        const { reportId } = req.params;
        const report = await reportController.getReportById(reportId);
        res.json(report);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Atualizar um relatório por ID
router.put('/:reportId', async (req, res) => {
    try {
        const { reportId } = req.params;
        const result = await reportController.updateReportById(reportId, req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Excluir um relatório por ID
router.delete('/:reportId', async (req, res) => {
    try {
        const { reportId } = req.params;
        const result = await reportController.deleteReportById(reportId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
