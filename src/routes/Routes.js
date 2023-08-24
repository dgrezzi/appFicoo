import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';

import { AuthContext } from '../contexts/auth';
import Abertura from '../pages/abertura';
import T1 from '../pages/t1';
import T2 from '../pages/t2';
import T3 from '../pages/t3';
import Activate from './Activate';
import MyTabs from './MyTabs';

const AppStack = createNativeStackNavigator();

export default function Routes() {
  const { locale } = useContext(AuthContext);
  let dic = require('../dic/lang.json');
  let lang = dic[locale];

  return (
    <AppStack.Navigator initialRouteName="Abertura">
      <AppStack.Screen
        name="Abertura"
        component={Abertura}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="Activate"
        component={Activate}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="T1"
        component={T1}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="T2"
        component={T2}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="T3"
        component={T3}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="MyTabs"
        component={MyTabs}
        options={{
          headerShown: false,
        }}
      />
    </AppStack.Navigator>
  );
}
