import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import ficoo from '../../assets/logoFicoo23.png';
import { VARS } from '../../constants/VARS';
import styles from '../../styles/styles';

const storage = new MMKV({ id: 'appFicoo' });

const Links = props => {
  const data = props.data;
  return (
    <TouchableOpacity
      onPress={() => props?.onPress()}
      style={{
        width: '100%',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: VARS.color.blueLight,
        elevation: 10,
        backgroundColor: data.bgColor,
        aspectRatio: 6,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={[
          {
            fontFamily: 'Abel',
            fontSize: 22,
            letterSpacing: 1,
            color: data.color,
          },
        ]}>
        {data.label}
      </Text>
    </TouchableOpacity>
  );
};

export default function Dashboard() {
  const navigation = useNavigation();
  const [lista, setLista] = useState();

  const getDocs = async () => {
    const markers = [];
    await firestore()
      .collection('user')
      .get()
      .then(result => {
        result.forEach(doc => {
          doc.data().uid = doc.id;
          markers.push(doc.data());
        });
        return null;
      })
      .catch(err => {
        console.error('erro no banco:', err);
      });
    setLista(markers);
    return markers;
  };

  return (
    <View
      style={[
        styles.container,
        {
          justifyContent: 'flex-start',
          gap: 20,
        },
      ]}>
      <Image
        style={{
          height: 250,
          backgroundColor: 'transparent',
          resizeMode: 'contain',
          margin: 15,
        }}
        source={ficoo}
      />

      <Links
        onPress={() => {
          navigation.navigate('checkin');
        }}
        data={{
          label: 'Check in no evento',
          bgColor: VARS.color.white,
          color: VARS.color.title,
        }}
      />
      <Links
        onPress={() => {
          navigation.navigate('ListUser');
        }}
        data={{
          label: 'Participantes',
          bgColor: VARS.color.white,
          color: VARS.color.title,
        }}
      />

      {lista &&
        lista.map((item, index) => (
          <View
            key={index}
            style={{
              width: '100%',
              backgroundColor: 'cyan',
              paddingHorizontal: 20,
              padding: 5,
              borderRadius: 12,
            }}>
            <Text>
              Nome: {item?.name} / email: {item?.email}
            </Text>
            <Text>
              Admim? {JSON.stringify(item?.isAdmin)} / PWD:{' '}
              {JSON.stringify(item?.pwd)}
            </Text>
            <Text>UID: {JSON.stringify(item?.uid)}</Text>
          </View>
        ))}
      {/* <TouchableOpacity
        onPress={() => {
          storage.clearAll();
        }}>
        <Text>Teste</Text>
      </TouchableOpacity> */}
    </View>
  );
}
