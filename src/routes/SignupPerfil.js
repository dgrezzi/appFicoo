import React, { useContext } from 'react';
import { AuthContext } from '../contexts/auth';
import Profile from '../pages/profile';
import Signup from '../pages/signup';

export default function SignupPerfil() {
  const { dataContext } = useContext(AuthContext);
  return dataContext.user?.uid ? <Profile /> : <Signup />;
}
