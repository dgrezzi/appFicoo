import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';

import { AuthContext } from '../contexts/auth';
import Credentials from '../pages/credentials';
import Cursos from '../pages/cursos';
import ListUser from '../pages/listUser';
import LostPass from '../pages/lostPass';
import EditProfileRoute from './EditProfileRoute';
import SigninPerfil from './SigninPerfil';
import SignupPerfil from './SignupPerfil';

const AppStack = createNativeStackNavigator();

export default function PerfilRoute() {
  const { locale } = useContext(AuthContext);
  let dic = require('../dic/lang.json');
  let lang = dic[locale];

  return (
    <AppStack.Navigator initialRouteName="Perfil">
      <AppStack.Screen
        name="Perfil"
        component={SigninPerfil}
        options={{
          title: lang.titleProfile,
          headerShown: true,
        }}
      />
      <AppStack.Screen
        name="Signup"
        component={SignupPerfil}
        options={({ route }) => ({
          title: lang.titleInsc,
        })}
      />
      <AppStack.Screen
        name="LostPass"
        component={LostPass}
        options={({ route }) => ({
          title: lang.titleLostPass,
        })}
      />
      <AppStack.Screen
        name="EditProfile"
        component={EditProfileRoute}
        options={({ route }) => ({
          title: lang.titleEditProfile,
        })}
      />
      <AppStack.Screen
        name="Credentials"
        component={Credentials}
        options={({ route }) => ({
          title: lang.titleCredential,
        })}
      />
      <AppStack.Screen
        name="ListUser"
        component={ListUser}
        options={({ route }) => ({
          title: lang.listUser,
        })}
      />
      <AppStack.Screen
        name="Cursos"
        component={Cursos}
        options={({ route }) => ({
          title: lang.perfilInsc,
        })}
      />
    </AppStack.Navigator>
  );
}
