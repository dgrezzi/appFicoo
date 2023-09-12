import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/auth';
import Mpe from '../pages/mpeFicoo/mpe';
import NewMpe from '../pages/mpeFicoo/newMpe';
import Profile from '../pages/profile';

const AppStack = createNativeStackNavigator();

export default function MpeRoutes() {
  const { locale } = useContext(AuthContext);
  let dic = require('../dic/lang.json');
  let lang = dic[locale];

  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Mpe"
        component={Mpe}
        options={{
          title: lang.mpe,
          headerShown: true,
        }}
      />
      <AppStack.Screen
        name="newMpe"
        component={NewMpe}
        options={{
          title: lang.mpe,
        }}
      />
      <AppStack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: lang.titleProfile,
        }}
      />
    </AppStack.Navigator>
  );
}
