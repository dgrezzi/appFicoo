import React from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import aboutStyles from '../styles/aboutStyles';
import globalStyles from '../styles/globalStyles';

import flagBr from '../assets/br.png';
import flagEn from '../assets/en.png';
import flagEs from '../assets/es.png';

import handleLocale from '../functions/handleLocale';
import languageStyles from '../styles/languageStyles';

export default function Language() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={globalStyles.keyboardAvoidingView}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={[globalStyles.container, globalStyles.space]}>
          <View style={[aboutStyles.flag, globalStyles.center]}>
            <TouchableOpacity
              style={globalStyles.btnFlag}
              onPress={() => {
                handleLocale('en');
              }}>
              <Image style={languageStyles.flag} source={flagEn} />
            </TouchableOpacity>

            <TouchableOpacity
              style={globalStyles.btnFlag}
              onPress={() => {
                handleLocale('es');
              }}>
              <Image style={languageStyles.flag} source={flagEs} />
            </TouchableOpacity>

            <TouchableOpacity
              style={globalStyles.btnFlag}
              onPress={() => {
                handleLocale('pt');
              }}>
              <Image style={languageStyles.flag} source={flagBr} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
