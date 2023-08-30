import auth from '@react-native-firebase/auth';
import { formatDistance } from 'date-fns';
import { enUS, es, ptBR } from 'date-fns/locale';
import React, { useContext, useMemo } from 'react';
import { Text, View } from 'react-native';
import { VARS } from '../../constants/VARS';
import { AuthContext } from '../../contexts/auth';

function ChatMessage({ data }) {
  const user = auth().currentUser?.toJSON();
  const { locale } = useContext(AuthContext);

  function formatTime() {
    if (data.createdAt?.seconds) {
      const datePost = new Date(data.createdAt?.seconds * 1000);
      if (locale == 'pt') {
        return formatDistance(new Date(), datePost, {
          locale: ptBR,
        });
      }
      if (locale == 'en') {
        return formatDistance(new Date(), datePost, {
          locale: enUS,
        });
      }
      if (locale == 'es') {
        return formatDistance(new Date(), datePost, {
          locale: es,
        });
      }
    }
  }

  const isMyMessage = useMemo(() => {
    return data?.user?._id === user.uid;
  }, [data]);

  return (
    <View style={[{ backgroundColor: 'transparent' }]}>
      <View
        style={[
          {
            borderRadius: 15,
            borderBottomEndRadius: isMyMessage ? 0 : null,
            borderTopLeftRadius: isMyMessage ? null : 0,
            padding: 12,
            minHeight: 50,
            paddingHorizontal: 16,
            marginVertical: 6,
            justifyContent: 'center',
            alignItems: 'flex-start',
            elevation: 10,
            borderWidth: 1,
            borderColor: VARS.color.blueLight,
            backgroundColor: isMyMessage ? VARS.color.blue : VARS.color.white,
            marginLeft: isMyMessage ? 50 : 10,
            marginRight: isMyMessage ? 10 : 50,
          },
        ]}>
        {!isMyMessage && (
          <Text
            style={[
              {
                fontFamily: 'AbelBold',
                fontSize: 18,
                letterSpacing: 1,
                color: VARS.color.blue,
              },
            ]}>
            {data?.user?.displayName}
          </Text>
        )}
        <Text
          style={[
            {
              fontFamily: 'Abel',
              fontSize: 18,
              letterSpacing: 1,
              color: isMyMessage ? VARS.color.white : VARS.color.blue,
            },
          ]}>
          {data.text}
        </Text>
        <Text
          style={{
            width: '100%',
            textAlign: 'right',
            fontFamily: 'Abel',
            fontSize: 13,
            color: isMyMessage ? VARS.color.white : VARS.color.blue,
          }}>
          {formatTime()}
        </Text>
      </View>
    </View>
  );
}

export default ChatMessage;
