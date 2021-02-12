import express from 'express';
import routes from './routes';
import './database';
import appointmentRouter from './routes/appointments.routes';

const app = express();
app.use(express.json());
app.use(routes);

export default app;
