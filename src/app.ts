import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
//import swaggerSpecs from '.config/swagger';
import sequelize from 'sequelize';

//Routes
import studentRouter from './routes/student.routes';

const app = express();

app.use(cors());
app.use(express.json());

//Endpoints
app.use('/students', studentRouter);

export default app;
