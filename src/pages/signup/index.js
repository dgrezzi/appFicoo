import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Btn from '../../components/Btn/intex';
import InputTxt from '../../components/InputTxt';
import { VARS } from '../../constants/VARS';
import { AuthContext } from '../../contexts/auth';
import handleSignUp from '../../functions/handleSignUp';
import styles from '../../styles/styles';

export default function Signup() {
  const navigation = useNavigation();

  const { locale } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [city, setCity] = useState();
  const [pwd, setPwd] = useState();
  const [pwd2, setPwd2] = useState();
  const [checkBox1, setCheckBox1] = useState();
  const [checkBox2, setCheckBox2] = useState();

  const validInputSign = () => {
    if (
      name &&
      email &&
      city &&
      pwd.length >= 6 &&
      pwd == pwd2 &&
      checkBox1 &&
      checkBox2
    ) {
      handleSignUp(name, email, city, pwd);
      navigation.goBack();
      return;
    }
    if (!name || !email || city || checkBox1 || checkBox2) {
      alert(lang.allForm);
      return;
    }
    if (pwd.length <= 6) {
      alert(lang.pass6);
      return;
    }
  };

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
          style={[styles.container, { justifyContent: 'flex-start', gap: 30 }]}>
          <View style={{ width: '100%', gap: 12, marginTop: 18 }}>
            <InputTxt
              icon="person-outline"
              placeholder={lang.completName}
              value={name}
              security={false}
              onChangeText={txt => {
                setName(txt);
              }}
            />
            <InputTxt
              icon="mail-outline"
              placeholder={lang.labelEmail}
              value={email}
              security={false}
              onChangeText={txt => {
                setEmail(txt.toLowerCase());
              }}
            />

            <InputTxt
              icon="location-outline"
              placeholder={lang.cityLive}
              value={city}
              security={false}
              onChangeText={txt => {
                setCity(txt);
              }}
            />
          </View>
          <View style={{ width: '100%', gap: 12 }}>
            <InputTxt
              icon="lock-closed-outline"
              placeholder={lang.pass}
              value={pwd}
              security={true}
              onChangeText={txt => {
                setPwd(txt);
              }}
            />
            <InputTxt
              icon="lock-closed-outline"
              placeholder={lang.confirmPass}
              value={pwd2}
              security={true}
              onChangeText={txt => {
                setPwd2(txt);
              }}
            />
          </View>
          <View style={{ width: '100%' }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
              }}>
              <CheckBox
                disabled={false}
                value={checkBox1}
                tintColors={{ true: VARS.color.blue, false: VARS.color.gray }}
                onValueChange={newValue => setCheckBox1(newValue)}
              />
              <Text>{lang.term1}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
              }}>
              <CheckBox
                disabled={false}
                value={checkBox2}
                tintColors={{ true: VARS.color.blue, false: VARS.color.gray }}
                onValueChange={newValue => setCheckBox2(newValue)}
              />
              <Text>{lang.term2}</Text>
            </View>
          </View>
          <Btn
            label={lang.enter}
            color={VARS.color.blue}
            icon="arrow-forward-circle"
            iconColor={VARS.color.orange}
            iconSize={VARS.size.icons}
            onPress={() => {
              validInputSign();
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
