import { Picker } from '@react-native-picker/picker';
import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import { VARS } from '../constants/VARS';
import { AuthContext } from '../contexts/auth';
import handleLocale from '../functions/handleLocale';

const storage = new MMKV({ id: 'appFicoo' });

export default function Language() {
  const { locale } = useContext(AuthContext);
  let dic = require('../dic/lang.json');
  let lang = dic[locale];

  const [selectedLanguage, setSelectedLanguage] = useState('pt');
  useEffect(() => {
    const lang = storage.getString('locale');
    lang ? setSelectedLanguage(lang?.slice(1, 3)) : setSelectedLanguage('pt');
  }, []);

  return (
    <View style={{ flex: 1, gap: 6, width: '100%' }}>
      <Text
        style={{
          fontFamily: 'Abel',
          fontSize: 18,
          letterSpacing: 1,
          color: VARS.color.gray,
        }}>
        {lang.idioma}
      </Text>
      <View
        style={{
          borderRadius: 15,
          borderWidth: 1,
          borderColor: VARS.color.whiteOpacity,
          paddingHorizontal: 10,
          elevation: 5,
          shadowColor: VARS.color.gray,
          backgroundColor: VARS.color.white,
          marginBottom: 15,
        }}>
        <Picker
          selectedValue={selectedLanguage}
          mode="dropdown"
          dropdownIconColor={VARS.color.blue}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedLanguage(itemValue);
            handleLocale(itemValue);
          }}>
          <Picker.Item
            label={lang.english}
            value={'en'}
            style={{
              fontFamily: 'Abel',
              letterSpacing: 1,
              fontSize: 18,
              color: VARS.color.blue,
            }}
          />
          <Picker.Item
            label={lang.portugues}
            value="pt"
            style={{
              fontFamily: 'Abel',
              letterSpacing: 1,
              fontSize: 18,
              color: VARS.color.blue,
            }}
          />
          <Picker.Item
            label={lang.spanish}
            value="es"
            style={{
              fontFamily: 'Abel',
              letterSpacing: 1,
              fontSize: 18,
              color: VARS.color.blue,
            }}
          />
        </Picker>
      </View>
    </View>
  );
}
