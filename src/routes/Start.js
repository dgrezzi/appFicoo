import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Cursos from '../pages/cursos';

const AppStack = createNativeStackNavigator();

export default function Start() {
  return (
    <AppStack.Navigator initialRouteName="Abertura">
      <AppStack.Screen
        name="Cursos"
        component={Cursos}
        options={({ route }) => ({
          title: 'Start',
          headerShown: true,
        })}
      />
    </AppStack.Navigator>
  );
}
