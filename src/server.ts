import app from './app';
import sequelize from './config/database';
import { connectMongoDB } from './config/mongodb';

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
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
