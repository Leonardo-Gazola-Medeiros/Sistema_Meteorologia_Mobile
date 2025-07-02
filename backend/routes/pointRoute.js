const express = require('express');
const router = express.Router({ mergeParams: true }); // Habilita a propagação de parâmetros

const pointController = require('../controller/point');

// Criar um novo ponto para um usuário
router.post('/', async (req, res) => {
    try {
        const { userId } = req.params;  // userId será propagado corretamente agora
        const result = await pointController.createPoint(userId, req.body);
        res.status(201).json(result);  // Retorna o ponto criado
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obter todos os pontos de um usuário
router.get('/', async (req, res) => {
    try {
        const { userId } = req.params;
        const points = await pointController.getAllPointsByUser(userId);
        res.json(points);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obter um ponto específico por ID
router.get('/:pointId', async (req, res) => {
    try {
        const { userId, pointId } = req.params;
        const point = await pointController.getPointById(userId, pointId);  // Nova função no controller
        res.json(point);  // Retorna o ponto específico
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Atualizar um ponto por ID
router.put('/:pointId', async (req, res) => {
    try {
        const { userId, pointId } = req.params;
        const result = await pointController.updatePointById(userId, pointId, req.body);
        res.json(result);  // Retorna o ponto atualizado
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Excluir um ponto por ID
router.delete('/:pointId', async (req, res) => {
    try {
        const { userId, pointId } = req.params;
        const result = await pointController.deletePointById(userId, pointId);
        res.json(result);  // Retorna a mensagem de exclusão
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
