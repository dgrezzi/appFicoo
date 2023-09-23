import { Ionicons } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { VARS } from '../../constants/VARS';
import { AuthContext } from '../../contexts/auth';

export default function InputTxt(props) {
  const [passVisible, setPassVisible] = useState(!props.security);
  const { locale } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];
  return (
    <View
      style={[
        {
          width: '100%',
          minHeight: props.minHeight ? props?.minHeight : 52,
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: VARS.color.blueLight,
          borderWidth: 1,
          borderRadius: 12,
          paddingHorizontal: 12,
          backgroundColor: VARS.color.white,
          elevation: 5,
          shadowColor: VARS.color.blue,
          fontSize: 20,
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
          {
            fontFamily: 'fontRegular',
            fontSize: 20,
            flex: 1,
            height: '100%',
            letterSpacing: 1,
            textAlignVertical: props.minHeight ? 'top' : null,
            paddingVertical: 10,
          },
        ]}
        autoCorrect={!props.security}
        multiline={props.multiline}
        placeholder={passVisible ? props.placeholder : '*******'}
        secureTextEntry={!passVisible}
        editable={props.editable}
        value={props.value}
        keyboardType={props.keyboardType}
        maxLength={props.maxLength}
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
  );
}

/*Utilização do componente

<InputTxt
  icon=""
  multiline={}
  placeholder=""
  security={}
  editable={}
  value={}
  maxLength={20}
  onChangeText={txt => {

  }}
/>

*/
