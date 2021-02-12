import { Router } from 'express';
import { parseISO} from 'date-fns';
import { getCustomRepository} from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthentication from '../middlewares/ensureAuthenticated';


const appointmentRouter = Router();

appointmentRouter.use(ensureAuthentication);

appointmentRouter.get('/', async (request, response) => {
  const appointmentsRepository =  getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentRouter.post('/', async (request, response) => {
  try{
    const{ provider_id, date } = request.body;
    const parsedDate =parseISO(date);
    const createAppointmentService = new CreateAppointmentService();
    const appointmet = await createAppointmentService.execute({provider_id, date: parsedDate});
    return response.json(appointmet);
  }catch(err){
    return response.status(400).json({error: err.message});
  }
})


export default appointmentRouter;