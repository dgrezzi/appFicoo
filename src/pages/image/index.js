import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { download } from 'react-native-compressor';
import { VARS } from '../../constants/VARS';
import styles from '../../styles/styles';

const FormatURL = async ({ url, uid }) => {
  const uploadFirebase = async response => {
    const storegaRef = storage().ref('users').child(uid);
    const putFile = await storegaRef.putFile(response).then(() => {
      console.log('Sucesso');
    });
  };

  const downloadFileUrl = await download(url, progress => {
    console.log('downloadProgress: ', progress);
  });
  uploadFirebase(downloadFileUrl);
  return;
};

export default function ImageResize() {
  const [list, setList] = useState();

  const myUid = 'MTEO6jAudONUiK3PT3ZVFn4CB572';

  const getDocs = async () => {
    const markers = [];
    await firestore()
      .collection('user')
      .get()
      .then(result => {
        result.forEach(doc => {
          doc.data().uid = doc.id;
          doc.data().ficoo
            ? markers.unshift(doc.data())
            : markers.push(doc.data());
        });
        return null;
      })
      .catch(err => {
        console.error('erro no banco:', err);
      });
    markers.sort((a, b) => {
      if (b.ficoo) return 1;
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
    setList(markers.slice(0, 10));
    return markers.slice(0, 10);
  };

  const ImageCard = ({ data }) => {
    return (
      <View
        style={{
          height: 260,
          width: '100%',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: VARS.color.whiteDark,
          backgroundColor: 'white',
          elevation: 10,
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: 12,
          gap: 12,
        }}>
        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              FormatURL({ url: data.photoURL, uid: data.uid });
            }}
            style={{
              paddingHorizontal: 40,
              padding: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: VARS.color.whiteDark,
              backgroundColor: 'white',
              elevation: 10,
            }}>
            <Text>compress</Text>
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'fontRegular',
              fontSize: 18,
              letterSpacing: 1,
            }}>
            {data.name}
          </Text>
          <View
            style={{
              width: 130,
              aspectRatio: 1,
              borderWidth: 1,
              borderColor: VARS.color.whiteDark,
              borderRadius: 100,
            }}>
            {data.photoURL ? (
              <Image
                style={{
                  height: '100%',
                  width: '100%',
                  aspectRatio: 1,
                  borderWidth: 1,
                  borderColor: VARS.color.whiteOpacity,
                  borderRadius: 100,
                  resizeMode: 'cover',
                }}
                source={{ uri: data.photoURL }}
              />
            ) : null}
          </View>
          <View style={{ gap: 10 }}>
            <Text
              style={{
                fontFamily: 'fontRegular',
                fontSize: 14,
                letterSpacing: 1,
              }}>
              {data.uid}
            </Text>
            <Text
              style={{
                fontFamily: 'fontRegular',
                fontSize: 16,
                letterSpacing: 1,
              }}>
              {data.email}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { gap: 20, paddingVertical: 20 }]}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          columnGap: 5,
          minWidth: '100%',
          paddingHorizontal: 15,
          paddingVertical: 20,
          gap: 10,
        }}
        horizontal={false}>
        {list?.map((info, index) => {
          return (
            <ImageCard
              key={index}
              data={{
                name: info.name,
                email: info.email,
                photoURL: info.photoURL,
                uid: info.uid,
              }}
            />
          );
        })}
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          getDocs();
        }}
        style={{
          paddingHorizontal: 40,
          padding: 10,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: VARS.color.whiteDark,
          backgroundColor: 'white',
          elevation: 10,
        }}>
        <Text>Get image</Text>
      </TouchableOpacity>
    </View>
  );
}
