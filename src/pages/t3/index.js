import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import t3bg from '../../../src/assets/t3-bg.png';
import { VARS } from '../../constants/VARS';
import { AuthContext } from '../../contexts/auth';
import styles from '../../styles/styles';

export default function T3() {
  const navigation = useNavigation();

  const { locale } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

  return (
    <View style={[styles.container, { paddingHorizontal: 0 }]}>
      <Image
        style={{ position: 'absolute', top: 0, width: '100%' }}
        source={t3bg}
      />
      <View style={[styles.tview]}>
        <Text
          style={[
            {
              fontFamily: 'fontRegular',
              lineHeight: 34,
              color: VARS.color.white,
              textAlign: 'center',
              width: '100%',
              fontSize: 24,
              letterSpacing: 0.6,
            },
          ]}>
          {lang.titleT3}
        </Text>
        <Text
          style={[
            {
              color: VARS.color.white,
              textAlign: 'center',
              width: '100%',
              lineHeight: 34,
              letterSpacing: 0.5,
              fontSize: 18,
              fontFamily: 'fontRegular',
              opacity: 0.8,
            },
          ]}>
          {lang.messageT3}
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
              navigation.navigate('T2');
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
            <Text style={{ fontSize: 10, color: 'gray' }}>{'\u2B24'}</Text>
            <Text style={{ fontSize: 10, color: 'white' }}>{'\u2B24'}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Activate');
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
