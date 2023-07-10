import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { APP_VARS } from './src/constants/APP_VARS';
import AuthProvider from './src/contexts/auth';

import Activate from './src/routes/Activate';

export default function app() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar
          backgroundColor={APP_VARS.color.primary}
          barStyle="dark-content"
        />
        <Activate />
      </AuthProvider>
    </NavigationContainer>
  );
}
