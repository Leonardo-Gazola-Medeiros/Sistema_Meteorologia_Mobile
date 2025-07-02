const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get("/", async (req, res) => {
  try {
    // Verifica se o token foi enviado no cabeçalho Authorization
    const authorizationHeader = req.headers.authorization;
    console.log("Cabeçalho Authorization recebido:", authorizationHeader);

    const token = authorizationHeader?.split(' ')[1]; // 'Bearer TOKEN'
    console.log("Token extraído:", token);

    if (!token) {
      console.log("Nenhum token fornecido");
      return res.status(401).json({ valid: false, message: 'Token não fornecido' });
    }

    // Verifica e decodifica o token JWT
    jwt.verify(token, 'fatec', (err, decoded) => {  // Certifique-se de usar a mesma chave secreta 'fatec'
      if (err) {
        console.log("Erro ao verificar token:", err.message);
        return res.status(401).json({ valid: false, message: 'Token inválido' });
      }

      // Se o token for válido, extraímos as informações do usuário
      console.log("Token verificado com sucesso:");
      console.log(`   
                            _id: ${decoded._id}
                            user: ${decoded.nome_usuario}
                            email: ${decoded.email}
                            `);

      // Retorna os dados do usuário decodificados a partir do token
      return res.json({
        _id: decoded._id,  // Use _id em vez de id
        valid: true,
        username: decoded.nome_usuario,
        email: decoded.email
      });
    });
  } catch (error) {
    console.error('Erro no servidor:', error.message);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
});

module.exports = router;
