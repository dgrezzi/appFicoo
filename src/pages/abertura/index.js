import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import logoFicoo from '../../../src/assets/logoFicoo23.png';
import styles from '../../styles/styles';

import { MMKV } from 'react-native-mmkv';
const storage = new MMKV({ id: 'appFicoo' });

export default function Abertura() {
  const navigation = useNavigation();
  const active = storage.getString('active');

  useEffect(() => {
    setTimeout(() => {
      active ? navigation.navigate('MyTabs') : navigation.navigate('Activate');
    }, 100);
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
          Pular
        </Text>
      </TouchableOpacity>
    </View>
  );
}
