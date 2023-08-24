import React, { useContext } from 'react';
import { AuthContext } from '../contexts/auth';
import EditProfile from '../pages/editProfile';
import Signin from '../pages/signin';

export default function EditProfileRoute() {
  const { dataContext } = useContext(AuthContext);
  return dataContext.user?.uid ? <EditProfile /> : <Signin />;
}
