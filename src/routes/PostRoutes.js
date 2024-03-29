import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
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
    <AppStack.Navigator initialRouteName="Posts">
      <AppStack.Screen
        name="Post"
        component={Posts}
        options={{
          title: lang.titlePost,
          headerShown: true,
        }}
      />
      <AppStack.Screen
        name="newPost"
        component={NewPost}
        options={{
          title: lang.titleNewPost,
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
