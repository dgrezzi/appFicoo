import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { MMKV } from 'react-native-mmkv';
import logo from '../../../src/assets/logo.png';
import Btn from '../../components/Btn/intex';
import InputTxt from '../../components/InputTxt';
import Language from '../../components/Language';
import Loading from '../../components/Loading';
import { VARS } from '../../constants/VARS';
import { AuthContext } from '../../contexts/auth';
import handleSignIn from '../../functions/handleSignIn';
import styles from '../../styles/styles';

const storage = new MMKV({ id: 'appFicoo' });

export default function Signin() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const { locale } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

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
      {loading && <Loading />}
      <TouchableWithoutFeedback
        style={{ width: '100%' }}
        onPress={() => Keyboard.dismiss()}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            backgroundColor: 'red',
            alignItems: 'center',
          }}>
          <View
            style={[
              styles.container,
              { paddingVertical: 25, justifyContent: 'space-between', gap: 20 },
            ]}>
            <TouchableOpacity
              onLongPress={() => {
                Alert.alert('Atenção!', 'Resetar o aplicativo?', [
                  {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => storage.clearAll(),
                  },
                ]);
              }}
              activeOpacity={1}>
              <Image style={[styles.logo]} source={logo} />
            </TouchableOpacity>

            <View
              style={{
                width: '100%',
                gap: 15,
                marginTop: 10,
              }}>
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
                icon="lock-closed-outline"
                placeholder={lang.pass}
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
                      fontFamily: 'fontRegular',
                      color: VARS.color.title,
                      fontSize: 18,
                      letterSpacing: 1,
                    }}>
                    {lang.lostPass}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Btn
              label={lang.enter}
              color={VARS.color.blue}
              icon="arrow-forward-circle"
              iconColor={VARS.color.orange}
              iconSize={VARS.size.icons}
              onPress={async () => {
                setLoading(true);
                if (email && pwd.length >= 6) {
                  await handleSignIn(email, pwd);
                } else {
                  Alert.alert('Atenção', lang.completForm);
                }
                setLoading(false);
              }}
            />
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
                onPress={() => {
                  navigation.navigate('Signup');
                }}
                activeOpacity={0.5}>
                <Text
                  style={[
                    {
                      fontFamily: 'fontRegular',
                      color: VARS.color.title,
                      fontSize: 16,
                      letterSpacing: 1,
                    },
                  ]}>
                  {lang.subscribe}
                </Text>
              </TouchableOpacity>
            </View>
            <Language />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
