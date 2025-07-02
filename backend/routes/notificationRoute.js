const express = require('express');
const router = express.Router({ mergeParams: true });  // Habilita a propagação de parâmetros
const notificationController = require('../controller/notification');

// Criar uma nova notificação para um ponto específico de um usuário
router.post('/', async (req, res) => {
    try {
        const { userId, pointId } = req.params;  // userId e pointId são propagados corretamente

        const result = await notificationController.createNotification(userId, pointId, req.body);
        res.status(201).json(result);  // Retorna a notificação criada
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obter todas as notificações de um ponto de um usuário
router.get('/', async (req, res) => {
    try {
        const { userId, pointId } = req.params;

        const notifications = await notificationController.getAllNotificationsByPoint(userId, pointId);
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obter uma notificação específica por ID
router.get('/:notificationId', async (req, res) => {
    try {
        const { userId, pointId, notificationId } = req.params;

        const notification = await notificationController.getNotificationById(userId, pointId, notificationId);
        res.json(notification);  // Retorna a notificação específica
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Atualizar uma notificação por ID
router.put('/:notificationId', async (req, res) => {
    try {
        const { userId, pointId, notificationId } = req.params;

        const result = await notificationController.updateNotificationById(userId, pointId, notificationId, req.body);
        res.json(result);  // Retorna a notificação atualizada
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Excluir uma notificação por ID
router.delete('/:notificationId', async (req, res) => {
    try {
        const { userId, pointId, notificationId } = req.params;
        const result = await notificationController.deleteNotificationById(userId, pointId, notificationId);
        res.json(result);  // Retorna a mensagem de exclusão
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
