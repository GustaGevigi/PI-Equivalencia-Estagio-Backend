import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './config/swagger';

import studentRouter from './routes/student.routes';
import advisorRouter from './routes/advisor.routes';
import adminRouter from './routes/admin.routes';
import courseRouter from './routes/course.routes';
import equivalencyRouter from './routes/equivalency.routes';
import advisorCourseRouter from './routes/advisorController.routes';
import requestRouter from './routes/request.routes';
import authRouter from './routes/auth.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use('/students', studentRouter);
app.use('/advisors', advisorRouter);
app.use('/administrators', adminRouter);
app.use('/courses', courseRouter);
app.use('/equivalencies', equivalencyRouter);
app.use('/advisor-courses', advisorCourseRouter);
app.use('/requests', requestRouter);
app.use('/auth', authRouter);

export default app;
