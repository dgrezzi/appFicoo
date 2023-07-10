import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ChatList from '../../../components/ChatList';
import { APP_VARS } from '../../../constants/APP_VARS';
import { AuthContext } from '../../../contexts/auth';
import globalStyles from '../../../styles/globalStyles';

export default function Search() {
  const { locale } = useContext(AuthContext);
  let dic = require('../../../dic/lang.json');
  let lang = dic[locale];

  const isFocused = useIsFocused();
  const [input, setInput] = useState('');
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null;
    setUser(hasUser);
  }, [isFocused]);

  async function handleSearch() {
    if (input === '') return;
    const responseSearch = await firestore()
      .collection('messages')
      .where('name', '>=', input)
      .where('name', '<=', input + '\uf8ff')
      .get()
      .then(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            name: '',
            lastMessage: { text: '' },
            ...documentSnapshot.data(),
          };
        });
        setChats(threads);
        setInput('');
        Keyboard.dismiss();
      });
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={[globalStyles.containerInput]}>
        <TextInput
          placeholder={lang.nameRoomAsk}
          value={input}
          onChangeText={text => setInput(text)}
          style={[globalStyles.inputSearch]}
          autoCapitalize={'none'}
        />
        <TouchableOpacity
          style={globalStyles.buttonSearch}
          onPress={handleSearch}>
          <MaterialIcons
            name="search"
            size={APP_VARS.size.icons}
            color={APP_VARS.color.white}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={chats}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <ChatList data={item} userStatus={user} />}
      />
    </SafeAreaView>
  );
}
