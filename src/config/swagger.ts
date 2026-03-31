import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Equivalência de Estágio',
      version: '1.0.0',
      description: 'Sistema de Solicitação de Equivalência de Estágio',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    tags: [
      {
        name: 'Admin',
        description: 'Operações de gerenciamento de administradores',
      },
      { name: 'Auth', description: 'Autenticação e Recuperação de Senha' },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const specs = swaggerJSDoc(options);

export default specs;
