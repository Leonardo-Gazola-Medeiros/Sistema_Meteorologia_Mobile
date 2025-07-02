const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // Verifica se existe um usuário logado
    if (!req.session.userLogged) {
      return res.status(400).json({ message: 'Nenhum usuário está logado' });
    }

    console.log('Iniciando o processo de logout, sessão atual:', req.session);

    // Destrói a sessão
    await req.session.destroy((err) => {
      if (err) {
        console.error('Erro ao destruir a sessão:', err.message);
        return res.status(500).json({ message: 'Erro ao fazer logout' });
      }

      console.log('Sessão destruída com sucesso');

      // Limpa o cookie 'userLogged' removendo-o do navegador
      res.clearCookie('userLogged', {
        path: '/', 
        httpOnly: true, 
      });

      // Retorna uma resposta de sucesso ao cliente
      return res.json({ message: 'Logout realizado com sucesso' });
    });
  } catch (error) {
    console.error('Erro no servidor:', error.message);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
});

module.exports = router;
