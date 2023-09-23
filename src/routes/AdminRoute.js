import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/auth';
import Checkin from '../pages/checkin';
import Credenciamento from '../pages/credenciamento';
import Dashboard from '../pages/dashboard';
import ListUser from '../pages/listUser';
import MakeAdmin from '../pages/makeAdmin';

const AppStack = createNativeStackNavigator();

export default function AdminRoute() {
  const { locale } = useContext(AuthContext);
  let dic = require('../dic/lang.json');
  let lang = dic[locale];

  return (
    <AppStack.Navigator initialRouteName="dashboard">
      <AppStack.Screen
        name="dashboard"
        component={Dashboard}
        options={({ route }) => ({
          headerShown: false,
          title: lang.titleDashboard,
        })}
      />
      <AppStack.Screen
        name="checkin"
        component={Checkin}
        options={({ route }) => ({
          title: lang.titleCheckin,
        })}
      />
      <AppStack.Screen
        name="ListUser"
        component={ListUser}
        options={({ route }) => ({
          headerShown: true,
          title: lang.listUser,
        })}
      />
      <AppStack.Screen
        name="Credenciamento"
        component={Credenciamento}
        options={({ route }) => ({
          headerShown: true,
          title: lang.titleCredenciamento,
        })}
      />
      <AppStack.Screen
        name="makeAdmin"
        component={MakeAdmin}
        options={({ route }) => ({
          headerShown: true,
          title: lang.titleMakeAdmin,
        })}
      />
    </AppStack.Navigator>
  );
}
