import firestore from '@react-native-firebase/firestore';
import { formatDistance } from 'date-fns';
import { enUS, es, ptBR } from 'date-fns/locale';
import React, { useContext, useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import { VARS } from '../../constants/VARS';
import { AuthContext } from '../../contexts/auth';

const storage = new MMKV({ id: 'appFicoo' });
const avatar = '../assets/avatarM.jpg';

export default function CardPost({ updateChild, data, userId, ...props }) {
  const { locale, dataContext } = useContext(AuthContext);
  const getDataUser = storage.getString('user');
  let dataUser = '';
  getDataUser ? (dataUser = JSON.parse(getDataUser)) : (dataUser = '');
  const [updateScreen, setUpdateScreen] = useState(false);

  const changeState = () => {
    updateChild();
  };

  function deleteRoom({ ownerId, idRoom }) {
    if (
      ownerId == dataContext?.user?.uid ||
      dataContext.storageData?.superAdm == true
    ) {
      Alert.alert(
        'Atenção!',
        'Você tem certeza que deseja deletar essa sala?',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => handleDeletePost(idRoom),
          },
        ],
      );
    } else return;
  }

  async function handleDeletePost(idRoom) {
    await firestore()
      .collection('posts')
      .doc(idRoom)
      .update({ disable: true })
      .then(() => {})
      .catch(err => {
        console.log(err);
      });
    changeState();
    return;
  }

  function formatTimePost() {
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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 14,
        padding: 12,
        elevation: 10,
        marginVertical: 8,
        marginHorizontal: 18,
        borderWidth: 1,
        borderColor: VARS.color.blueLight,
        shadowColor: VARS.color.blue,
      }}>
      <TouchableOpacity
        onLongPress={() => {
          deleteRoom({
            ownerId: data.uid,
            idRoom: data.id,
          });
        }}
        activeOpacity={1}>
        <View
          style={{
            width: '100%',
            gap: 10,
            padding: 5,
          }}>
          <Text
            numberOfLines={1}
            style={{
              fontFamily: 'AbelBold',
              fontSize: 24,
              letterSpacing: 1,
            }}
            multiline={false}>
            {data.title}
          </Text>
          <Text
            style={{
              fontFamily: 'Abel',
              fontSize: 20,
              letterSpacing: 1,
              textAlign: 'justify',
              color: VARS.color.black,
            }}
            multiline={true}>
            {data.post}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 8,
              width: '100%',
            }}>
            <View
              onPress={() => {}}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              {data.avatarURL && (
                <Image
                  style={{
                    width: VARS.size.avatar / 3.8,
                    aspectRatio: 1,
                    borderRadius: VARS.size.avatar / 2,
                    marginRight: 12,
                  }}
                  source={{ uri: data.avatarURL }}
                />
              )}
              {!data.avatarURL && (
                <Image
                  style={{
                    width: VARS.size.avatar / 2.3,
                    aspectRatio: 1,
                    borderRadius: VARS.size.avatar / 2,
                    marginRight: 12,
                  }}
                  source={{ uri: avatar }}
                />
              )}
              <Text
                numberOfLines={1}
                style={{ fontFamily: 'Abel', fontSize: 18, letterSpacing: 1 }}
                multiline={false}>
                {data.autor}
              </Text>
            </View>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: 'Abel',
                fontSize: 16,
                letterSpacing: 1,
              }}
              multiline={false}>
              {formatTimePost()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
