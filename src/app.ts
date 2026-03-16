import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
//import swaggerSpecs from '.config/swagger';
import sequelize from 'sequelize';

//Routes
import studentRouter from './routes/student.routes';
import advisorRouter from './routes/advisor.routes';
import adminRouter from './routes/admin.routes';

const app = express();

app.use(cors());
app.use(express.json());

//Endpoints
app.use('/students', studentRouter);
app.use('/advisors', advisorRouter);
app.use('/administrators', adminRouter);

export default app;
