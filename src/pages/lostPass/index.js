import auth from '@react-native-firebase/auth';
import React, { useContext, useState } from 'react';
import {
  Alert,
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

  const { locale } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

  const sendPasswordResetEmail = async () => {
    Alert.alert('Atenção', 'Verifique seu e-mail para recuperar sua senha');
    await auth()
      .sendPasswordResetEmail(email)
      .then(() => {})
      .catch(error => {
        // Ocorreu um erro ao enviar o email de redefinição de senha
        console.error(error.message);
      });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 140 : 0}
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
                fontFamily: 'fontRegular',
                width: '100%',
                textAlign: 'left',
                color: VARS.color.title,
                fontSize: 22,
                letterSpacing: 1,
                marginTop: 28,
              },
            ]}>
            {lang.lostPass}
          </Text>
          <Text
            style={[
              {
                fontFamily: 'fontRegular',
                width: '100%',
                textAlign: 'center',
                color: VARS.color.title,
                fontSize: 18,
                letterSpacing: 1,
              },
            ]}>
            {lang.lostPassInstruction}
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
              !email && Alert.alert('Atenção', lang.completeEmail);
              setEmail('');
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
