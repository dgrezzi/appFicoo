import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import logoFicoo from '../../../src/assets/logoFicoo23.png';
import { AuthContext } from '../../contexts/auth';
import styles from '../../styles/styles';

const storage = new MMKV({ id: 'appFicoo' });

export default function Abertura() {
  const navigation = useNavigation();
  const active = storage.getString('active');

  const { locale } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

  useEffect(() => {
    setTimeout(() => {
      active == true
        ? navigation.navigate('MyTabs')
        : navigation.navigate('Activate');
    }, 1000);
  }, []);

  return (
    <View
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container]}>
      <Image
        style={{ marginTop: -100, width: 247, height: 316 }}
        source={logoFicoo}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Activate');
        }}
        style={{
          width: 80,
          height: 30,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          right: 30,
          bottom: 30,
          borderRadius: 10,
        }}>
        <Text
          style={{
            color: 'gray',
            fontFamily: 'Abel',
            fontSize: 16,
            letterSpacing: 1,
          }}>
          {lang.skip}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
