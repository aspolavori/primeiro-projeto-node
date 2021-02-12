import {startOfHour} from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository' ;

interface Request{  
  date: Date;
  provider_id : string;
}

class CreateAppointmentService{
  public async execute({ date, provider_id}: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

    if(findAppointmentInSameDate){
      throw Error('Hora já cadastrada');
    }

    const appointmet = appointmentsRepository.create({ provider_id , date : appointmentDate});
    await appointmentsRepository.save(appointmet);

    return appointmet;
  }    
}

export default CreateAppointmentService;