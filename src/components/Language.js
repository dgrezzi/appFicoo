import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import { VARS } from '../constants/VARS';
import handleLocale from '../functions/handleLocale';
const storage = new MMKV({ id: 'appFicoo' });

export default function Language() {
  const [selectedLanguage, setSelectedLanguage] = useState();
  useEffect(() => {
    const lang = storage.getString('locale');
    setSelectedLanguage(lang?.slice(1, 3));
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
        Idioma:
      </Text>
      <View
        style={{
          borderRadius: 15,
          borderWidth: 1,
          borderColor: VARS.color.blueLight,
          paddingHorizontal: 20,
          elevation: 5,
          backgroundColor: VARS.color.white,
          marginBottom: 10,
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
            label="Inglês"
            value={'en'}
            style={{
              fontFamily: 'Abel',
              letterSpacing: 1,
              fontSize: 18,
              color: VARS.color.blue,
            }}
          />
          <Picker.Item
            label="Português"
            value="pt"
            style={{
              fontFamily: 'Abel',
              letterSpacing: 1,
              fontSize: 18,
              color: VARS.color.blue,
            }}
          />
          <Picker.Item
            label="Espanhol"
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
