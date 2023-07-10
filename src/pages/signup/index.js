import React, { useContext, useEffect, useState } from 'react';
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
import Loading from '../../components/Loading';
import { APP_VARS } from '../../constants/APP_VARS';
import { AuthContext } from '../../contexts/auth';
import validInputSign from '../../functions/validInputSign';
import globalStyles from '../../styles/globalStyles';
import signUpStyles from '../../styles/signUpStyles';

export default function Signup() {
  const { loading, setLoading, locale } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [login, setlogin] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={globalStyles.keyboardAvoidingView}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={[globalStyles.container, globalStyles.space]}>
          <View style={globalStyles.logoContainer}>
            <Image style={globalStyles.logo} source={logo} />
            <Text style={globalStyles.txtGray}>{lang.network}</Text>
          </View>
          <View style={signUpStyles.viewImput}>
            {!login && (
              <TextInput
                style={globalStyles.input}
                placeholder={lang.placeHName}
                value={name}
                onChangeText={txt => {
                  setName(txt);
                }}
              />
            )}
            <TextInput
              style={globalStyles.input}
              placeholder={lang.placeHEmail}
              value={email.toLowerCase()}
              onChangeText={txt => {
                setEmail(txt);
              }}
            />
            <TextInput
              style={globalStyles.input}
              placeholder={lang.placeHPass}
              secureTextEntry={true}
              value={pwd}
              onChangeText={txt => {
                setPwd(txt);
              }}
            />
          </View>
          <View style={signUpStyles.buttonContainer}>
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
                setLoading(true);
                validInputSign(login, email, pwd, name);
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
                {!login ? lang.signup : lang.signin}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={globalStyles.btnGray}
              onPress={() => {
                setlogin(!login);
              }}>
              <Text style={globalStyles.txtGray}>
                {!login ? lang.iHaveAccount : lang.newUser}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
