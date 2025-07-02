const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');
const jwt = require('jsonwebtoken');

router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Iniciando login. Dados recebidos:', { email, password });

        // Autenticação do usuário
        const user = await authController.login(email, password);
        console.log('Resultado da autenticação:', user);  // Verifique se o campo _id está presente aqui

        if (!user) {
            console.log('Usuário não encontrado ou credenciais inválidas.');
            return res.status(401).json({
                message: 'Credenciais inválidas. Por favor, verifique seu e-mail e senha.'
            });
        }

        // Adiciona um log para verificar se o _id está presente no objeto user
        console.log('ID do usuário:', user._id);

        // Gera um token JWT com `_id`
        const token = jwt.sign(
            {
                _id: user._id,  // Usar _id para consistência com o banco
                nome_usuario: user.nome_usuario,
                email: user.email_usuario
            },
            'fatec',  // Certifique-se de usar a chave secreta correta
            { expiresIn: '1h' }
        );

        console.log('Token gerado com sucesso:', token);

        // Retorna o token JWT ao cliente
        res.status(200).json({
            message: 'Login realizado com sucesso!',
            token: token,
            user: {
                _id: user._id,  // Mantendo _id como no banco
                nome_usuario: user.nome_usuario,
                email: user.email_usuario
            }
        });

        console.log('Login realizado com sucesso. Token e dados do usuário enviados ao cliente.');
    } catch (error) {
        console.error('Erro no servidor:', error.message);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

module.exports = router;
