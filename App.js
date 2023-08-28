import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import React from 'react';
import { StatusBar } from 'react-native';
import { VARS } from './src/constants/VARS';
import AuthProvider from './src/contexts/auth';
import Routes from './src/routes/Routes';
import Start from './src/routes/Start';

export default function App() {
  const [fontsLoaded] = useFonts({
    Abel: require('./assets/abel.ttf'),
  });
  const [fontsBoldLoaded] = useFonts({
    AbelBold: require('./assets/abelBold.ttf'),
  });

  const teste = Routes;
  const start = Start;

  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar
          barStyle="dark-content"
          animated={true}
          backgroundColor={VARS.color.white}
          showHideTransition="fade"
          hidden={false}
        />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}