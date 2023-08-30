import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Checkin from '../pages/checkin';
import Credenciamento from '../pages/credenciamento';
import Dashboard from '../pages/dashboard';
import ListUser from '../pages/listUser';
import MakeAdmin from '../pages/makeAdmin';

const AppStack = createNativeStackNavigator();

export default function AdminRoute() {
  return (
    <AppStack.Navigator initialRouteName="dashboard">
      <AppStack.Screen
        name="dashboard"
        component={Dashboard}
        options={({ route }) => ({
          headerShown: true,
          title: 'FICOO',
        })}
      />
      <AppStack.Screen
        name="checkin"
        component={Checkin}
        options={({ route }) => ({
          title: 'Check in',
        })}
      />
      <AppStack.Screen
        name="ListUser"
        component={ListUser}
        options={({ route }) => ({
          headerShown: true,
          title: 'Participantes',
        })}
      />
      <AppStack.Screen
        name="Credenciamento"
        component={Credenciamento}
        options={({ route }) => ({
          headerShown: true,
          title: 'Paineis e Oficinas',
        })}
      />
      <AppStack.Screen
        name="makeAdmin"
        component={MakeAdmin}
        options={({ route }) => ({
          headerShown: true,
          title: 'Gerador de Admins',
        })}
      />
    </AppStack.Navigator>
  );
}
