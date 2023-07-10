import auth from '@react-native-firebase/auth';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { APP_VARS } from '../../constants/APP_VARS';
import chatStyles from '../../styles/chatStyles';
import globalStyles from '../../styles/globalStyles';

function ChatMessage({ data }) {
  const user = auth().currentUser.toJSON();

  const isMyMessage = useMemo(() => {
    return data?.user?._id === user.uid;
  }, [data]);

  return (
    <View style={[globalStyles.container]}>
      <View
        style={[
          chatStyles.messageBox,
          {
            backgroundColor: isMyMessage
              ? APP_VARS.color.messages
              : APP_VARS.color.white,
            marginLeft: isMyMessage ? 50 : 0,
            marginRight: isMyMessage ? 0 : 50,
          },
        ]}>
        {!isMyMessage && (
          <Text style={[globalStyles.txtRed, globalStyles.padding]}>
            {data?.user?.displayName}
          </Text>
        )}
        <Text style={[globalStyles.txtDarkSmall, globalStyles.padding]}>
          {data.text}
        </Text>
      </View>
    </View>
  );
}

export default ChatMessage;
