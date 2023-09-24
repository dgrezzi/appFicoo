import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Btn from '../../components/Btn/intex';
import BtnEdit from '../../components/BtnEdit/intex';
import InputTxt from '../../components/InputTxt';
import Loading from '../../components/Loading';
import { VARS } from '../../constants/VARS';
import { AuthContext } from '../../contexts/auth';
import handleSignUp from '../../functions/handleSignUp';
import styles from '../../styles/styles';

export default function Signup() {
  const navigation = useNavigation();

  const { locale, lgpd } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [pwd, setPwd] = useState();
  const [pwd2, setPwd2] = useState();
  const [checkBox1, setCheckBox1] = useState(false);
  const [readTerm, setReadTerm] = useState(false);

  const validInputSign = () => {
    if (name && email && pwd.length >= 6 && pwd == pwd2 && checkBox1) {
      handleSignUp({ name: name, email: email, pwd: pwd })
        .then(() => {
          setLoading(false);
          navigation.goBack();
        })
        .catch(() => {
          setLoading(false);
        });
      return;
    }
    if (!name || !email || checkBox1) {
      Alert.alert('Atenção', lang.allForm);
      setLoading(false);
      return;
    }
    if (pwd.length <= 6) {
      Alert.alert('Atenção', lang.pass6);
      setLoading(false);
      return;
    }
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
      {loading && <Loading />}
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
              keyboardType="email-address"
              onChangeText={txt => {
                setEmail(txt.toLowerCase());
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
          <View style={{ width: '100%', gap: 12 }}>
            <View style={{ width: 180, marginVertical: 10 }}>
              <BtnEdit
                label={lang.readTerm}
                color={VARS.color.white}
                iconColor={VARS.color.green}
                iconSize={VARS.size.icons * 0.85}
                onPress={() => {
                  setReadTerm(true);
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                gap: 12,
                paddingHorizontal: 10,
              }}>
              <CheckBox
                disabled={false}
                value={checkBox1}
                style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                tintColors={{ true: VARS.color.blue, false: VARS.color.gray }}
                onValueChange={newValue => setCheckBox1(newValue)}
              />
              <Text>{lang.term1}</Text>
            </View>
          </View>
          <Btn
            label={lang.enter}
            color={VARS.color.blue}
            icon="arrow-forward-circle"
            iconColor={VARS.color.orange}
            iconSize={VARS.size.icons}
            onPress={() => {
              setLoading(true);
              validInputSign();
            }}
          />
        </View>
      </TouchableWithoutFeedback>
      {readTerm && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'white',
            width: '100%',
            height: '100%',
            zIndex: 999,
            gap: 50,
          }}>
          <View
            style={{
              backgroundColor: VARS.color.white,
              flex: 1,
              margin: 20,
              borderRadius: 30,
              borderWidth: 1,
              borderColor: VARS.color.blueLight,
              elevation: 10,
              padding: 20,
              paddingVertical: 20,
              alignItems: 'center',
              gap: 12,
            }}>
            <Text
              style={{
                width: '100%',
                textAlign: 'center',
                fontFamily: 'fontBold',
                fontSize: 20,
                letterSpacing: 1,
                color: VARS.color.blue,
              }}>
              {lang.titleLGPD}
            </Text>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={{ width: '100%' }}
              contentContainerStyle={{
                gap: 8,
                padding: 12,
                borderColor: VARS.color.whiteDark,
                borderWidth: 1,
                minHeight: '80%',
              }}>
              <Text
                style={{
                  width: '100%',
                  textAlign: 'justify',
                  fontSize: 16,
                  letterSpacing: 1,
                  color: VARS.color.black,
                }}>
                {lgpd[locale]}
              </Text>
            </ScrollView>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%',
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  padding: 8,
                  backgroundColor: VARS.color.white,
                  elevation: 5,
                  paddingHorizontal: 20,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: VARS.color.grayLight,
                }}
                onPress={() => {
                  setReadTerm(false);
                }}>
                <Text
                  style={{
                    fontFamily: 'fontBold',
                    fontSize: 16,
                    letterSpacing: 1,
                  }}>
                  {lang.close}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  padding: 8,
                  backgroundColor: VARS.color.white,
                  elevation: 5,
                  paddingHorizontal: 20,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: VARS.color.grayLight,
                }}
                onPress={() => {
                  setCheckBox1(true);
                  setReadTerm(false);
                }}>
                <Text
                  style={{
                    fontFamily: 'fontBold',
                    fontSize: 16,
                    letterSpacing: 1,
                  }}>
                  {lang.accept}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}
