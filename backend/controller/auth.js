const connectToDatabase = require('../database/dbConnection');

exports.login = async (email, password) => {
    try {
        const db = await connectToDatabase();
        
        // Busca o usuário pelo email
        const user = await db.collection('usuarios').findOne({ email_usuario: email });
        
        // Se o usuário não existir ou a senha estiver incorreta, retorna null
        if (!user || user.senha_usuario !== password) {
            return null;
        }


        return {
            _id: user._id,  // Usar _id ao invés de id
            nome_usuario: user.nome_usuario,
            email_usuario: user.email_usuario
        };
    } catch (error) {
        throw new Error(error.message);
    }
};
