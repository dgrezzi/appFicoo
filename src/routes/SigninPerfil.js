import React, { useContext } from 'react';
import { AuthContext } from '../contexts/auth';
import Profile from '../pages/profile';
import Signin from '../pages/signin';

export default function SigninPerfil() {
  const { dataContext } = useContext(AuthContext);
  return dataContext.user?.uid ? <Profile /> : <Signin />;
}
