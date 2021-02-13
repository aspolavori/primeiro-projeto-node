import { getRepository } from 'typeorm';
import User from '../models/User';
import { sign } from 'jsonwebtoken';
import {  compare } from 'bcryptjs';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';
import { response } from 'express';

interface Request{
  email: string;
  password;
}

interface Response{
  user: User;
  token: string;
}

class AuthenticateUserService{
  public async execute({ email, password}: Request): Promise<Response>{
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne({
      where :{email},
    });

    if(!user){
      throw new AppError('Incorect email/passaword combination.', 401);
    }
    const passwordMatchet = await compare(password, user.password);

    if(!passwordMatchet){
      throw new AppError('Incorect email/passaword combination.',  401)
    }
    
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ }, secret, {
      subject: user.id,
      expiresIn,
    } );

    return {
      user, 
      token,
    };
  };
}

export default AuthenticateUserService;