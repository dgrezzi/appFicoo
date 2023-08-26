import firestore from '@react-native-firebase/firestore';
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
  const { locale } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

  const [email, setEmail] = useState();
  const [newPwd, setNewPwd] = useState();

  function toBase64(input) {
    return Buffer.from(input, 'utf-8').toString('base64');
  }

  function fromBase64(encoded) {
    return Buffer.from(encoded, 'base64').toString('utf8');
  }

  async function setFirebaseLostPass() {
    await firestore()
      .collection('chamado')
      .doc()
      .set({
        createdAt: new Date(),
        email: email,
        newPwd: toBase64(newPwd),
      })
      .then(() => {
        alert('Seu chamado foi aberto');
        setEmail();
        setNewPwd();
      })
      .catch(err => {
        console.error('erro no banco:', err);
      });
  }

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
            Insira seu email para receber informações sobre criar NOVA SENHA
            {'\n'}
            (Mínimo 6 caracteres)
          </Text>
          <View style={{ width: '100%', gap: 12 }}>
            <EditInputText
              label="e-mail"
              placeholder=""
              value={email}
              editable={true}
              security={false}
              icon="mail-outline"
              onChangeText={txt => {
                setEmail(txt.toLowerCase());
              }}
            />
            <EditInputText
              label="Nova Senha"
              placeholder=""
              value={newPwd}
              editable={true}
              security={true}
              icon="lock-closed-outline"
              onChangeText={txt => {
                setNewPwd(txt);
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
              email && newPwd?.length >= 6 && setFirebaseLostPass();
              (!newPwd || !email || newPwd?.length < 6) &&
                alert('Preencha os campos corretamente');
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
