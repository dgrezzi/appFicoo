import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import {
  Alert,
  Image,
  ScrollView,
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

  const { locale } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

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
            label: lang.dashPaineisOfic,
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
      </ScrollView>
    </View>
  );
}
