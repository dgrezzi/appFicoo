import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import ChatMessage from '../../../components/ChatMessage';
import { APP_VARS } from '../../../constants/APP_VARS';
import handleSend from '../../../functions/handleSend';
import globalStyles from '../../../styles/globalStyles';
import messageStyles from '../../../styles/messageStyles';

export default function Messages({ route }) {
  const { thread } = route.params;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const user = auth().currentUser.toJSON();

  useEffect(() => {
    const unsubscribeListener = firestore()
      .collection('messages')
      .doc(thread._id)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
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
              name: firebaseData.user.displayName,
            };
          }
          return data;
        });
        setMessages(messages);
      });
    return () => unsubscribeListener();
  }, []);

  return (
    <SafeAreaView style={globalStyles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={messages}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <ChatMessage data={item} />}
        inverted={true}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ width: '100%' }}
        keyboardVerticalOffset={100}>
        <View style={messageStyles.containerInput}>
          <View style={messageStyles.mainContainerInput}>
            <TextInput
              placeholder="Sua mensagem..."
              style={globalStyles.input}
              value={input}
              onChangeText={text => setInput(text)}
              multiline={true}
              autoCorrect={false}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              handleSend(user, thread, input);
              setInput('');
            }}>
            <View style={messageStyles.buttonContainer}>
              <Feather
                name="send"
                size={APP_VARS.size.icons * 0.8}
                color={APP_VARS.color.icons}
                style={globalStyles.iconCenter}
              />
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
