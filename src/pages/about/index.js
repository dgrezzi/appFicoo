import React, { useContext, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import logo from '../../../src/assets/logo.png';
import { APP_VARS } from '../../constants/APP_VARS';
import { AuthContext } from '../../contexts/auth';
import aboutStyles from '../../styles/aboutStyles';
import globalStyles from '../../styles/globalStyles';

import { MMKV } from 'react-native-mmkv';
import Language from '../../components/Language';
const storage = new MMKV({ id: 'appFicoo' });

export default function About() {
  const { locale } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];
  const [passActivate, setPassActivate] = useState('lc5816qd');
  const [login, setlogin] = useState(true);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={globalStyles.keyboardAvoidingView}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={[globalStyles.container, globalStyles.space]}>
          <View style={globalStyles.logoContainer}>
            <Image style={globalStyles.logo} source={logo} />
            <Text style={globalStyles.txtGray}>{lang.activate}</Text>
          </View>
          <View style={aboutStyles.viewImput}>
            <TextInput
              style={globalStyles.input}
              placeholder={lang.code}
              value={passActivate}
              onChangeText={txt => {
                setPassActivate(txt);
              }}
            />
          </View>
          <View style={aboutStyles.buttonContainer}>
            <TouchableOpacity
              style={[
                globalStyles.btnBlue,
                {
                  backgroundColor: !login
                    ? APP_VARS.color.btnRed
                    : APP_VARS.color.btnGreen,
                },
              ]}
              onPress={() => {
                storage.set('active', passActivate);
              }}>
              <Text
                style={[
                  globalStyles.txtDark,
                  {
                    color: !login
                      ? APP_VARS.color.txtLight
                      : APP_VARS.color.txtDark,
                  },
                ]}>
                {lang.active}
              </Text>
            </TouchableOpacity>
          </View>
          <Language />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
