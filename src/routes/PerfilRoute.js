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
          title: 'Perfil',
          headerShown: true,
        }}
      />
      <AppStack.Screen
        name="Signup"
        component={SignupPerfil}
        options={({ route }) => ({
          title: 'INSCREVA - SE',
        })}
      />
      <AppStack.Screen
        name="LostPass"
        component={LostPass}
        options={({ route }) => ({
          title: 'RECUPERAÇÃO DE SENHA',
        })}
      />
      <AppStack.Screen
        name="EditProfile"
        component={EditProfileRoute}
        options={({ route }) => ({
          title: 'Edição do perfil',
        })}
      />
      <AppStack.Screen
        name="Credentials"
        component={Credentials}
        options={({ route }) => ({
          title: 'Credencial',
        })}
      />
      <AppStack.Screen
        name="ListUser"
        component={ListUser}
        options={({ route }) => ({
          title: 'Participantes',
        })}
      />
      <AppStack.Screen
        name="Cursos"
        component={Cursos}
        options={({ route }) => ({
          title: 'Inscrições',
        })}
      />
    </AppStack.Navigator>
  );
}
