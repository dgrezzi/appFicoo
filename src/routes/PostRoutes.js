import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { APP_VARS } from '../constants/APP_VARS';
import { AuthContext } from '../contexts/auth';
import NewPost from '../pages/postFicoo/newPost';
import Posts from '../pages/postFicoo/posts';
import Profile from '../pages/profile';

const AppStack = createNativeStackNavigator();

export default function PostRoutes() {
  const { locale } = useContext(AuthContext);
  let dic = require('../dic/lang.json');
  let lang = dic[locale];

  return (
    <AppStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: APP_VARS.color.primary },
      }}>
      <AppStack.Screen
        name="Post"
        component={Posts}
        options={{
          title: lang.pagePostTitle,
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="newPost"
        component={NewPost}
        options={{
          title: lang.pageNewPostTitle,
        }}
      />
      <AppStack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: lang.pageProfileTitle,
        }}
      />
    </AppStack.Navigator>
  );
}
