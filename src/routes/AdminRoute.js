import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Checkin from '../pages/checkin';
import Dashboard from '../pages/dashboard';
import ListUser from '../pages/listUser';

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
    </AppStack.Navigator>
  );
}
