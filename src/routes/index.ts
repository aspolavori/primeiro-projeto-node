import {Router} from 'express';
import appointmentRouter from './appointments.routes';
import userRouter from './users.routes';
import sessionRouter from './sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);

routes.get('/', (request, response) => {
  console.log('teste');
})

export default routes;
