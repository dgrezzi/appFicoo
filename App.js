import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { VARS } from './src/constants/VARS';
import AuthProvider from './src/contexts/auth';
import ExportUsers from './src/pages/exportUsers';
import Routes from './src/routes/Routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    fontRegular: require('./assets/Nunito.ttf'),
  });
  const [fontsBoldLoaded] = useFonts({
    fontBold: require('./assets/NunitoBold.ttf'),
  });
  const rotas = Routes;
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <NavigationContainer>
        <AuthProvider>
          <StatusBar
            barStyle="dark-content"
            setBarStyle
            animated={true}
            backgroundColor={VARS.color.white}
            showHideTransition="fade"
            hidden={false}
          />
          <ExportUsers />
          {/* <Routes /> */}
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}
