import auth from '@react-native-firebase/auth';
import { Buffer } from 'buffer';
import React, { useContext, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Btn from '../../components/Btn/intex';
import EditInputText from '../../components/EditInputText';
import { VARS } from '../../constants/VARS';
import { AuthContext } from '../../contexts/auth';
import styles from '../../styles/styles';

export default function LostPass() {
  const [email, setEmail] = useState();
  const [newPwd, setNewPwd] = useState();

  const { locale } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

  const sendPasswordResetEmail = async () => {
    await auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        // Email de redefinição de senha enviado com sucesso
        console.log('Email de redefinição de senha enviado com sucesso');
      })
      .catch(error => {
        // Ocorreu um erro ao enviar o email de redefinição de senha
        console.error(error.message);
      });
    console.log(email);
  };

  function toBase64(input) {
    return Buffer.from(input, 'utf-8').toString('base64');
  }

  function fromBase64(encoded) {
    return Buffer.from(encoded, 'base64').toString('utf8');
  }

  const resetPass = async mail => {};

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
          <Text
            style={[
              {
                fontFamily: 'Abel',
                width: '100%',
                textAlign: 'left',
                color: VARS.color.title,
                fontSize: 24,
                letterSpacing: 1,
                marginTop: 28,
              },
            ]}>
            {lang.lostPass}
          </Text>
          <Text
            style={[
              {
                fontFamily: 'Abel',
                width: '100%',
                textAlign: 'left',
                color: VARS.color.title,
                fontSize: 18,
                letterSpacing: 1,
              },
            ]}>
            {lang.lostPassInstruction} {'\n'}
            {lang.minPass}
          </Text>
          <View style={{ width: '100%', gap: 12 }}>
            <EditInputText
              label={lang.labelEmail}
              placeholder=""
              value={email}
              editable={true}
              security={false}
              icon="mail-outline"
              onChangeText={txt => {
                setEmail(txt.toLowerCase());
              }}
            />
          </View>
          <Btn
            label={lang.send}
            color={VARS.color.blue}
            icon="arrow-forward-circle"
            iconColor={VARS.color.orange}
            iconSize={VARS.size.icons}
            onPress={() => {
              email && sendPasswordResetEmail();
              !email && alert(lang.allForm);
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
