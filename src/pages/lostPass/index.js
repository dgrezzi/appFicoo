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
import styles from '../../styles/styles';

export default function LostPass() {
  const { locale } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

  const [email, setEmail] = useState();

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
            Esqueceu a sua senha?
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
            Insira seu email para receber informações sobre criar NOVA SENHA{' '}
          </Text>
          <View style={{ width: '100%', gap: 12 }}>
            <InputTxt
              icon="mail-outline"
              placeholder="e-mail"
              value={email}
              security={false}
              onChangeText={txt => {
                setEmail(txt.toLowerCase());
              }}
            />
          </View>
          <Btn
            label="ENVIAR"
            color={VARS.color.blue}
            icon="arrow-forward-circle"
            iconColor={VARS.color.orange}
            iconSize={VARS.size.icons}
            onPress={() => {
              alert('Add function');
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
