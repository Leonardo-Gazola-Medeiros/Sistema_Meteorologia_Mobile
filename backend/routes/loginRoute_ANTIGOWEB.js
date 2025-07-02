const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');

router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authController.login(email, password);
        console.log('TESTE LOGIN',email,' - ',password);

        // Se o usuário não for encontrado ou as credenciais forem inválidas
        if (!user) {
            return res.status(401).json({
                message: 'Credenciais inválidas. Por favor, verifique seu e-mail e senha.'
            });
        }

        // Armazena as informações essenciais no cookie da sessão
        req.session.userLogged = {
            id: user._id,  // Certifique-se de que é o correto identificador (ObjectId)
            nome_usuario: user.nome_usuario,
            email: user.email_usuario
        };

        // Retorna uma mensagem de sucesso junto com os dados do usuário logado
        res.status(200).json({
            message: 'Login realizado com sucesso!',
            user: {
                id: user._id,
                nome_usuario: user.nome_usuario,
                email: user.email_usuario
            }
        });
    } catch (error) {
        console.error('Erro no servidor:', error.message);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

module.exports = router;
