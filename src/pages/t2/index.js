import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import t2bg from '../../../src/assets/t2-bg.jpg';
import { VARS } from '../../constants/VARS';
import { AuthContext } from '../../contexts/auth';
import styles from '../../styles/styles';

export default function T2() {
  const navigation = useNavigation();

  const { locale } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

  return (
    <View style={[styles.container, { paddingHorizontal: 0 }]}>
      <Image
        style={{
          position: 'absolute',
          top: 0,
          resizeMode: 'cover',
          width: '100%',
          height: '100%',
        }}
        source={t2bg}
      />
      <View style={[styles.tview]}>
        <Text
          style={[
            {
              color: VARS.color.white,
              textAlign: 'justify',
              width: '100%',
              lineHeight: 34,
              letterSpacing: 0.5,
              fontSize: 20,
              fontFamily: 'fontRegular',
              opacity: 0.8,
              paddingHorizontal: 10,
            },
          ]}>
          {lang.messageT2}
        </Text>
        <View
          style={[
            {
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            },
          ]}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('T1');
            }}>
            <Text
              style={[
                {
                  fontFamily: 'fontRegular',
                  lineHeight: 34,
                  color: VARS.color.white,
                  fontSize: 16,
                  opacity: 0.5,
                  letterSpacing: 1,
                },
              ]}>
              {lang.preview}
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <Text style={{ fontSize: 10, color: 'gray' }}>{'\u2B24'}</Text>
            <Text style={{ fontSize: 10, color: 'white' }}>{'\u2B24'}</Text>
            <Text style={{ fontSize: 10, color: 'gray' }}>{'\u2B24'}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('T3');
            }}>
            <Text
              style={[
                {
                  fontFamily: 'fontRegular',
                  lineHeight: 34,
                  color: VARS.color.white,
                  fontSize: 16,
                  letterSpacing: 1,
                },
              ]}>
              {lang.next}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
