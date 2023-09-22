import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';

import {
  Alert,
  Image,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MMKV } from 'react-native-mmkv';
import ficoo from '../../assets/logoFicoo23.png';
import { VARS } from '../../constants/VARS';
import { AuthContext } from '../../contexts/auth';
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
            fontFamily: 'fontRegular',
            fontSize: 20,
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

  const { locale, mpe, setMpe, dataContext } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

  const setFirebaseMpe = async value => {
    await firestore()
      .collection('configs')
      .doc('ativacao')
      .update({ mpe: !mpe })
      .then(() => {
        setMpe(!mpe);
      })
      .catch(err => {
        console.error('erro no banco:', err);
      });
  };

  return (
    <View
      style={[
        styles.container,
        {
          justifyContent: 'flex-start',
          paddingHorizontal: 0,
        },
      ]}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingVertical: 30,
          gap: 20,
        }}>
        <TouchableOpacity
          onLongPress={() => {
            Alert.alert('Atenção!', 'Resetar o aplicativo?', [
              {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => storage.clearAll(),
              },
            ]);
          }}
          activeOpacity={1}>
          <Image
            style={{
              height: 250,
              backgroundColor: 'transparent',
              resizeMode: 'contain',
              margin: 15,
            }}
            source={ficoo}
          />
        </TouchableOpacity>
        <Links
          onPress={() => {
            navigation.navigate('checkin');
          }}
          data={{
            label: lang.dashCheckin,
            bgColor: VARS.color.white,
            color: VARS.color.title,
          }}
        />
        <Links
          onPress={() => {
            navigation.navigate('Credenciamento');
          }}
          data={{
            label: lang.dashOficinas,
            bgColor: VARS.color.white,
            color: VARS.color.title,
          }}
        />
        <Links
          onPress={() => {
            navigation.navigate('ListUser');
          }}
          data={{
            label: lang.dashListUserLabel,
            bgColor: VARS.color.white,
            color: VARS.color.title,
          }}
        />
        <Links
          onPress={() => {
            navigation.navigate('makeAdmin');
          }}
          data={{
            label: lang.dashMulti,
            bgColor: VARS.color.white,
            color: VARS.color.title,
          }}
        />
        {dataContext.storageData?.superAdm && (
          <View
            style={{ flexDirection: 'row', width: '100%', marginVertical: 10 }}>
            <Switch
              style={{ marginHorizontal: 8, transform:[{scaleX:0.75},{scaleY:0.75}] }}
              onValueChange={() => {
                Alert.alert(
                  'Atenção!',
                  mpe == false
                    ? 'Você irá habilitar a página MPE'
                    : 'Você irá desabilitar a página MPE',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => {},
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: () => setFirebaseMpe(!mpe),
                    },
                  ],
                );
              }}
              value={mpe}
            />
            <Text
              style={{
                fontFamily: 'fontRegular',
                fontSize: 18,
                letterSpacing: 1,
                color: 'black',
              }}>
              Pagina MPE
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
