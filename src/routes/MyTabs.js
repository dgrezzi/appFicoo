import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { APP_VARS } from '../constants/APP_VARS';
import Calendar from '../pages/calendar';
import Home from '../pages/home';
import ChatRoutes from './ChatRoutes';
import PostRoutes from './PostRoutes';
import Routes from './Routes';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  // const iconPerfil = dataContext.uid ? 'user-check' : 'user';
  const iconPerfil = 'user';

  return (
    <Tab.Navigator
      initialRouteName="messages"
      screenOptions={{
        tabBarActiveTintColor: APP_VARS.color.activeIcon,
        tabBarInactiveTintColor: APP_VARS.color.icons,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: APP_VARS.color.secundary,
        },

        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={APP_VARS.size.icons} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          headerTitle: 'Calendar',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="calendar" size={APP_VARS.size.icons} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Posts"
        component={PostRoutes}
        options={{
          headerTitle: 'Posts',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather
              name="book-open"
              size={APP_VARS.size.icons}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={ChatRoutes}
        options={{
          headerTitle: 'Messages',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather
              name="message-square"
              size={APP_VARS.size.icons}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Routes}
        options={{
          headerTitle: 'Perfil',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather
              name={iconPerfil}
              size={APP_VARS.size.icons}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
