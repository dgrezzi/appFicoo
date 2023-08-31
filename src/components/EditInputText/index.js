import { Ionicons } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { VARS } from '../../constants/VARS';
import { AuthContext } from '../../contexts/auth';

export default function EditInputTxt(props) {
  const [passVisible, setPassVisible] = useState(!props.security);

  const { locale } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

  return (
    <View
      style={{
        width: '100%',
        gap: 4,
        marginVertical: 4,
      }}>
      <Text
        style={{
          fontFamily: 'Abel',
          fontSize: 18,
          letterSpacing: 1,
          color: VARS.color.gray,
        }}>
        {props.label}:
      </Text>
      <View
        style={[
          {
            width: '100%',
            minHeight: 52,
            maxHeight: 300,
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: VARS.color.whiteDark,
            borderWidth: 1,
            borderRadius: 12,
            paddingHorizontal: 10,
            backgroundColor: VARS.color.white,
            elevation: 5,
            shadowColor: VARS.color.blue,
            fontSize: 22,
          },
        ]}>
        <Ionicons
          style={{ marginRight: 6, opacity: 0.8 }}
          name={props.icon}
          size={VARS.size.icons * 0.8}
          color={VARS.color.subColor}
        />
        <TextInput
          style={[
            props.textAlignVertical ? { paddingVertical: 10 } : null,
            {
              fontFamily: 'Abel',
              fontSize: 20,
              flex: 1,
              height: '100%',
              letterSpacing: 1,
              color: VARS.color.blue,
            },
          ]}
          autoCorrect={!props.security}
          placeholder={passVisible ? props.placeholder : '*****'}
          secureTextEntry={!passVisible}
          value={props.value}
          maxLength={props.maxLength}
          textAlignVertical={props.textAlignVertical}
          keyboardType={props.keyboardType}
          multiline={props.multiline}
          editable={props.editable}
          onChangeText={data => {
            props.onChangeText(data);
          }}
        />
        {props.security && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setPassVisible(!passVisible);
            }}>
            <Ionicons
              style={{ marginRight: 6, opacity: 0.8 }}
              name={passVisible ? 'eye-outline' : 'eye-off-outline'}
              size={VARS.size.icons * 0.8}
              color={VARS.color.subColor}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

/*Utilização do componente

<EditInputTxt
  icon="lock-closed-outline"
  placeholder="Confirme sua Senha"
  value={pwd2}
  security={true}
  onChangeText={txt => {
    setPwd2(txt);
  }}
/>

*/
