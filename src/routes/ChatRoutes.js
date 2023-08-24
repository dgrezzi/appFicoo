import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';

import { AuthContext } from '../contexts/auth';
import ChatRoom from '../pages/chatFicoo/ChatRoom';
import Messages from '../pages/chatFicoo/Messages';

const AppStack = createNativeStackNavigator();

export default function ChatRoutes() {
  const { locale } = useContext(AuthContext);
  let dic = require('../dic/lang.json');
  let lang = dic[locale];

  return (
    <AppStack.Navigator initialRouteName="ChatRoom">
      <AppStack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={{
          headerShown: false,
        }}
      />

      <AppStack.Screen
        name="chatMessages"
        component={Messages}
        options={({ route }) => ({
          title: route.params.thread.name,
        })}
      />
    </AppStack.Navigator>
  );
}
