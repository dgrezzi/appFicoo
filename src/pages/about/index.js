import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { MMKV } from 'react-native-mmkv';
import logo from '../../../src/assets/logo.png';
import Btn from '../../components/Btn/intex';
import InputTxt from '../../components/InputTxt';
import Language from '../../components/Language';
import { VARS } from '../../constants/VARS';
import { AuthContext } from '../../contexts/auth';
import styles from '../../styles/styles';

const storage = new MMKV({ id: 'appFicoo' });

export default function About() {
  const navigation = useNavigation();

  const { locale } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];
  const [passActivate, setPassActivate] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      style={[
        styles.keyboardAvoidingView,
        {
          backgroundColor: VARS.color.white,
        },
      ]}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          style={[styles.container, { justifyContent: 'flex-start', gap: 28 }]}>
          <Image style={[styles.logo, { marginTop: 50 }]} source={logo} />
          <Text
            style={{
              fontFamily: 'Abel',
              fontSize: 22,
              letterSpacing: 1,
            }}>
            {lang.activate}
          </Text>
          <View style={{ alignItems: 'center', gap: 10 }}>
            <InputTxt
              icon="key-outline"
              placeholder={lang.activateCode}
              value={passActivate}
              security={false}
              onChangeText={txt => {
                setPassActivate(txt);
              }}
            />
            <Btn
              label={lang.enter}
              color={VARS.color.blue}
              icon="log-in-outline"
              iconColor={VARS.color.white}
              iconSize={VARS.size.icons * 0.8}
              onPress={() => {
                navigation.navigate('T1');
                setTimeout(() => {
                  storage.set('active', passActivate);
                }, 1000);
              }}
            />
          </View>
          <Language />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
