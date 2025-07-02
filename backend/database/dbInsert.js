const { ObjectId } = require('mongodb');

// IDs gerados para usuários existentes
const userAdminId = new ObjectId();
const userThiagoId = new ObjectId();
const userGiovaniId = new ObjectId();
const userPedroId = new ObjectId();
const userJulianoId = new ObjectId();
const userLucasId = new ObjectId();
const userWilliansId = new ObjectId();

module.exports = {
    usuarios: [
        {
            _id: userAdminId, // Associando o ID
            nome_usuario: "Admin",
            email_usuario: "admin@admin.com",
            senha_usuario: "123456789",
            pontos: [
                {
                    _id: new ObjectId(), 
                    apelido: "São Paulo",
                    lat_long: {
                        latitude: -23.55052,
                        longitude: -46.6333
                    },
                    notificacoes: [
                        { _id: new ObjectId(), mensagem: "Alerta de sistema" }
                    ]
                },
                {
                    _id: new ObjectId(),
                    apelido: "Campinas",
                    lat_long: {
                        latitude: -22.9099,
                        longitude: -47.0626
                    },
                    notificacoes: [
                        { _id: new ObjectId(), mensagem: "Alerta de baixa umidade" }
                    ]
                }
            ]
        },
        {
            _id: userThiagoId, // Associando o ID
            nome_usuario: "Thiago",
            email_usuario: "thiago@gmail.com",
            senha_usuario: "123456789",
            pontos: [
                {
                    _id: new ObjectId(),
                    apelido: "Rio de Janeiro",
                    lat_long: {
                        latitude: -22.9068,
                        longitude: -43.1729
                    },
                    notificacoes: [
                        { _id: new ObjectId(), mensagem: "Alerta de temperatura alta" },
                        { _id: new ObjectId(), mensagem: "Alerta de umidade baixa" }
                    ]
                },
                {
                    _id: new ObjectId(),
                    apelido: "Niterói",
                    lat_long: {
                        latitude: -22.8832,
                        longitude: -43.1034
                    },
                    notificacoes: [
                        { _id: new ObjectId(), mensagem: "Alerta de solo seco" }
                    ]
                }
            ]
        },
        {
            _id: userGiovaniId, // Associando o ID
            nome_usuario: "Giovani",
            email_usuario: "giovani@gmail.com",
            senha_usuario: "123456789",
            pontos: [
                {
                    _id: new ObjectId(),
                    apelido: "Belo Horizonte",
                    lat_long: {
                        latitude: -19.9167,
                        longitude: -43.9345
                    },
                    notificacoes: [
                        { _id: new ObjectId(), mensagem: "Alerta de solo seco" }
                    ]
                },
                {
                    _id: new ObjectId(),
                    apelido: "Contagem",
                    lat_long: {
                        latitude: -19.9386,
                        longitude: -44.0539
                    },
                    notificacoes: [
                        { _id: new ObjectId(), mensagem: "Alerta de pragas" }
                    ]
                }
            ]
        },
        {
            _id: userPedroId, // Associando o ID
            nome_usuario: "Pedro",
            email_usuario: "pedro@gmail.com",
            senha_usuario: "123456789",
            pontos: [
                {
                    _id: new ObjectId(),
                    apelido: "Brasília",
                    lat_long: {
                        latitude: -15.8267,
                        longitude: -47.9218
                    },
                    notificacoes: [
                        { _id: new ObjectId(), mensagem: "Alerta de pragas" },
                        { _id: new ObjectId(), mensagem: "Alerta de solo encharcado" },
                        { _id: new ObjectId(), mensagem: "Alerta de temperatura alta" }
                    ]
                },
                {
                    _id: new ObjectId(),
                    apelido: "Goiânia",
                    lat_long: {
                        latitude: -16.6869,
                        longitude: -49.2648
                    },
                    notificacoes: [
                        { _id: new ObjectId(), mensagem: "Alerta de solo seco" }
                    ]
                }
            ]
        },
        {
            _id: userJulianoId, // Associando o ID
            nome_usuario: "Juliano",
            email_usuario: "juliano@gmail.com",
            senha_usuario: "123456789",
            pontos: [
                {
                    _id: new ObjectId(),
                    apelido: "Curitiba",
                    lat_long: {
                        latitude: -25.4284,
                        longitude: -49.2733
                    },
                    notificacoes: [
                        { _id: new ObjectId(), mensagem: "Alerta de vento forte" },
                        { _id: new ObjectId(), mensagem: "Alerta de baixa luminosidade" },
                        { _id: new ObjectId(), mensagem: "Alerta de umidade alta" },
                        { _id: new ObjectId(), mensagem: "Alerta de pragas" }
                    ]
                },
                {
                    _id: new ObjectId(),
                    apelido: "Ponta Grossa",
                    lat_long: {
                        latitude: -25.0916,
                        longitude: -50.1668
                    },
                    notificacoes: [
                        { _id: new ObjectId(), mensagem: "Alerta de solo encharcado" }
                    ]
                }
            ]
        },
        {
            _id: userLucasId, // Associando o ID
            nome_usuario: "Lucas",
            email_usuario: "lucas@gmail.com",
            senha_usuario: "123456789",
            pontos: [
                {
                    _id: new ObjectId(),
                    apelido: "Salvador",
                    lat_long: {
                        latitude: -12.9714,
                        longitude: -38.5014
                    },
                    notificacoes: [
                        { _id: new ObjectId(), mensagem: "Alerta de solo encharcado" },
                        { _id: new ObjectId(), mensagem: "Alerta de pragas" }
                    ]
                },
                {
                    _id: new ObjectId(),
                    apelido: "Feira de Santana",
                    lat_long: {
                        latitude: -12.2667,
                        longitude: -38.9667
                    },
                    notificacoes: [
                        { _id: new ObjectId(), mensagem: "Alerta de solo seco" }
                    ]
                }
            ]
        },
        {
            _id: userWilliansId, // Associando o ID
            nome_usuario: "Willians",
            email_usuario: "willians@gmail.com",
            senha_usuario: "123456789",
            pontos: [
                {
                    _id: new ObjectId(),
                    apelido: "Porto Alegre",
                    lat_long: {
                        latitude: -30.0346,
                        longitude: -51.2177
                    },
                    notificacoes: [
                        { _id: new ObjectId(), mensagem: "Alerta de vento forte" },
                        { _id: new ObjectId(), mensagem: "Alerta de temperatura alta" },
                        { _id: new ObjectId(), mensagem: "Alerta de solo seco" },
                        { _id: new ObjectId(), mensagem: "Alerta de pragas" },
                        { _id: new ObjectId(), mensagem: "Alerta de solo encharcado" }
                    ]
                },
                {
                    _id: new ObjectId(),
                    apelido: "Caxias do Sul",
                    lat_long: {
                        latitude: -29.1678,
                        longitude: -51.1794
                    },
                    notificacoes: [
                        { _id: new ObjectId(), mensagem: "Alerta de solo encharcado" }
                    ]
                }
            ]
        }
    ],
    reports: [
        {
            "_id": new ObjectId(),
            "userId": userAdminId,
            "titulo": "Relatório Clima",
            "conteudo": "Aqui está o conteúdo do relatório...",
            "data_criacao": new Date()
        }
    ]
};
