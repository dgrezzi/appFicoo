import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import logo from '../../../src/assets/logo.png';
import Btn from '../../components/Btn/intex';
import InputTxt from '../../components/InputTxt';
import Language from '../../components/Language';
import Loading from '../../components/Loading';
import { VARS } from '../../constants/VARS';
import { AuthContext } from '../../contexts/auth';
import handleSignIn from '../../functions/handleSignIn';
import styles from '../../styles/styles';

export default function Signin() {
  const navigation = useNavigation();

  const { loading, setLoading, locale } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
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
      <TouchableWithoutFeedback
        style={{ width: '100%' }}
        onPress={() => Keyboard.dismiss()}>
        <ScrollView
          contentContainerStyle={{
            backgroundColor: 'red',
            alignItems: 'center',
          }}>
          <View
            style={[
              styles.container,
              { paddingVertical: 25, justifyContent: 'space-between', gap: 20 },
            ]}>
            <Image style={[styles.logo]} source={logo} />
            <View
              style={{
                width: '100%',
                gap: 15,
                marginTop: 10,
              }}>
              <InputTxt
                icon="mail-outline"
                placeholder="e-mail"
                value={email}
                security={false}
                onChangeText={txt => {
                  setEmail(txt.toLowerCase());
                }}
              />
              <InputTxt
                icon="lock-closed-outline"
                placeholder="Senha"
                value={pwd}
                security={true}
                onChangeText={txt => {
                  setPwd(txt);
                }}
              />
              <View
                style={{
                  width: '100%',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => navigation.navigate('LostPass')}
                  style={{
                    padding: 8,
                    paddingLeft: 20,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Abel',
                      color: VARS.color.title,
                      fontSize: 18,
                      letterSpacing: 1,
                    }}>
                    Esqueceu a senha?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Btn
              label="ENTRAR"
              color={VARS.color.blue}
              icon="arrow-forward-circle"
              iconColor={VARS.color.orange}
              iconSize={VARS.size.icons}
              onPress={() => {
                if (email && pwd.length >= 6) {
                  handleSignIn(email, pwd);
                  return;
                } else {
                  alert('Preencha corretamente todos os campos');
                }
              }}
            />
            <Language />
            <View
              style={{
                backgroundColor: 'white',
                paddingHorizontal: 30,
                padding: 10,
                borderRadius: 12,
                elevation: 5,
                borderWidth: 1,
                borderColor: VARS.color.whiteDark,
              }}>
              <TouchableOpacity
                style={
                  {
                    // flex: 1,
                  }
                }
                onPress={() => {
                  navigation.navigate('Signup');
                }}
                activeOpacity={0.5}>
                <Text
                  style={[
                    {
                      fontFamily: 'Abel',
                      color: VARS.color.title,
                      fontSize: 22,
                      letterSpacing: 1,
                    },
                  ]}>
                  INSCREVA-SE
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
