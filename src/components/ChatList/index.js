import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { VARS } from '../../constants/VARS';

function ChatList({ data, deleteRoom, userStatus }) {
  const navigation = useNavigation();

  function openChat() {
    if (userStatus) {
      navigation.navigate('chatMessages', { thread: data });
    } else {
      navigation.navigate('PerfilRoute');
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{
        flex: 1,
        marginHorizontal: 15,
        backgroundColor: 'white',
        borderRadius: 14,
        padding: 12,
        elevation: 8,
        marginVertical: 6,
        borderWidth: 1,
        borderColor: VARS.color.blueLight,
        shadowColor: VARS.color.blue,
      }}
      onPress={openChat}
      onLongPress={() => deleteRoom && deleteRoom()}>
      <Text
        style={{ fontFamily: 'AbelBold', fontSize: 24, letterSpacing: 1 }}
        numberOfLines={1}>
        {data.name}
      </Text>

      <Text
        style={{ fontFamily: 'Abel', fontSize: 20, letterSpacing: 1 }}
        numberOfLines={1}>
        {data.lastMessage.text}
      </Text>
    </TouchableOpacity>
  );
}

export default ChatList;
