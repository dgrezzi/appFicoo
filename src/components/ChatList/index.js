import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import chatStyles from '../../styles/chatStyles';
import globalStyles from '../../styles/globalStyles';

function ChatList({ data, deleteRoom, userStatus }) {
  const navigation = useNavigation();

  function openChat() {
    if (userStatus) {
      navigation.navigate('chatMessages', { thread: data });
    } else {
      navigation.navigate('Perfil');
    }
  }

  return (
    <TouchableOpacity
      onPress={openChat}
      onLongPress={() => deleteRoom && deleteRoom()}>
      <View style={[chatStyles.row, globalStyles.space]}>
        <View style={[chatStyles.content, globalStyles.space]}>
          <View style={[chatStyles.header]}>
            <Text style={globalStyles.txtRedBold} numberOfLines={1}>
              {data.name}
            </Text>
          </View>

          <Text style={globalStyles.txtDarkSmall} numberOfLines={1}>
            {data.lastMessage.text}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ChatList;
