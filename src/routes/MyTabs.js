import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext } from 'react';
import { VARS } from '../constants/VARS';
import { AuthContext } from '../contexts/auth';
import About from '../pages/about';
import Calendar from '../pages/calendar';
import Home from '../pages/home';
import AdminRoute from './AdminRoute';
import ChatRoutes from './ChatRoutes';
import MpeRoutes from './MpeRoutes';
import PerfilRoute from './PerfilRoute';
import PostRoutes from './PostRoutes';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  const { dataContext, active, locale, mpe } = useContext(AuthContext);
  let dic = require('../dic/lang.json');
  let lang = dic[locale];

  return !active ? (
    <About />
  ) : (
    <Tab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarActiveTintColor: VARS.color.orange,
        tabBarInactiveTintColor: VARS.color.grayLight,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: VARS.color.blue,
          height: 54,
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: 'Home',
          headerShown: false,
          gestureEnabled: true,
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="home-outline"
              size={VARS.size.icons * 0.8}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          headerTitle: lang.titleProgram,
          gestureEnabled: true,
          headerShown: true,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="calendar-outline"
              size={VARS.size.icons * 0.8}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Posts"
        component={PostRoutes}
        options={{
          headerShown: false,
          gestureEnabled: true,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="reader-outline"
              size={VARS.size.icons * 0.8}
              color={color}
            />
          ),
        }}
      />
      {mpe && (
        <Tab.Screen
          name="MpeRoute"
          component={MpeRoutes}
          options={{
            headerShown: false,
            gestureEnabled: true,
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
            tabBarIcon: ({ color }) => (
              <Ionicons
                name="mail-open-outline"
                size={VARS.size.icons * 0.8}
                color={color == VARS.color.grayLight ? 'white' : color}
              />
            ),
          }}
        />
      )}
      <Tab.Screen
        name="Messages"
        component={ChatRoutes}
        options={{
          headerShown: false,
          gestureEnabled: true,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="chatbox-ellipses-outline"
              size={VARS.size.icons * 0.8}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="PerfilRoute"
        component={PerfilRoute}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="person-outline"
              size={VARS.size.icons * 0.8}
              color={color}
            />
          ),
        }}
      />
      {dataContext.storageData?.isAdmin && (
        <Tab.Screen
          name="adminRoute"
          component={AdminRoute}
          options={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Ionicons
                name="settings-outline"
                size={VARS.size.icons * 0.8}
                color={color}
              />
            ),
          })}
        />
      )}
    </Tab.Navigator>
  );
}
