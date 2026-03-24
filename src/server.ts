import app from './app';
import sequelize from './config/database';
import { setupAssociations } from './infrastructure/database/sequelize/models/associations';
import { connectMongoDB } from './config/mongodb';

setupAssociations();

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    console.log('Conectado ao banco:', sequelize.getDatabaseName());
    console.log('Host do banco:', sequelize.config.host);
    console.log('Dialeto sendo usado:', sequelize.getDialect());

    console.log('MySQL ready!');

    await connectMongoDB();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to run server:', error);
  }
};

startServer();
