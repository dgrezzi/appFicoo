import React, { useContext } from 'react';
import { AuthContext } from '../contexts/auth';
import Dashboard from '../pages/dashboard';
import Signup from '../pages/signup';

export default function Routes() {
  const { dataContext } = useContext(AuthContext);
  return dataContext.user?.uid ? <Dashboard /> : <Signup />;
}
