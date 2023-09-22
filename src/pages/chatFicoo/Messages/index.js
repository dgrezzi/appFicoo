import { Ionicons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import ChatMessage from '../../../components/ChatMessage';
import InputTxt from '../../../components/InputTxt';
import { VARS } from '../../../constants/VARS';
import { AuthContext } from '../../../contexts/auth';
import handleSend from '../../../functions/handleSend';
import styles from '../../../styles/styles';

export default function Messages({ route }) {
  const { thread } = route.params;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const { dataContext, locale } = useContext(AuthContext);
  let dic = require('../../../dic/lang.json');
  let lang = dic[locale];

  useEffect(() => {
    const unsubscribeListener = firestore()
      .collection('messages')
      .doc(thread._id)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .onSnapshot(async querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();
          const data = {
            _id: doc.id,
            text: '',
            createdAt: firestore.FieldValue.serverTimestamp(),
            ...firebaseData,
          };
          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.storageData?.name,
            };
          }
          return data;
        });
        setMessages(messages);
      });
    return () => unsubscribeListener();
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: VARS.color.white, paddingHorizontal: 5 },
      ]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 140 : 0}
        style={[
          styles.keyboardAvoidingView,
          {
            width: '100%',
            backgroundColor: 'transparent',
          },
        ]}>
        <FlatList
          style={{ width: '100%', backgroundColor: 'transparent' }}
          data={messages}
          keyExtractor={item => item._id}
          renderItem={({ item }) => <ChatMessage data={item} />}
          inverted={true}
        />
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            marginVertical: 10,
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
              borderRadius: 25,
              marginRight: 10,
            }}>
            <InputTxt
              icon=""
              multiline={false}
              placeholder={lang.yourMessage}
              security={false}
              editable={true}
              value={input}
              maxLength={150}
              onChangeText={txt => {
                setInput(txt);
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: VARS.color.orange,
              width: VARS.size.icons * 1.2,
              height: VARS.size.icons * 1.2,
              borderRadius: VARS.size.icons,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            activeOpacity={0.9}
            onPress={() => {
              handleSend(dataContext, thread, input);
              setInput('');
            }}>
            <Ionicons
              name="navigate-outline"
              size={VARS.size.icons * 0.7}
              color={VARS.color.white}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
