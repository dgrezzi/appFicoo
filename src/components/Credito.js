import { useContext } from 'react';
import { Text, View } from 'react-native';
import { VARS } from '../constants/VARS';
import { AuthContext } from '../contexts/auth';

export default function Credito() {
  const { locale } = useContext(AuthContext);
  let dic = require('../dic/lang.json');
  let lang = dic[locale];
  return (
    <View
      style={{
        gap: 10,
        borderTopWidth: 1,
        marginTop: 10,
        paddingTop: 15,
        alignItems: 'center',
        width: '100%',
        borderStyle: 'dashed',
        paddingHorizontal: 15,
        borderColor: VARS.color.grayLight,
      }}>
      <Text
        style={{
          fontFamily: 'fontRegular',
          fontSize: 20,
          letterSpacing: 1,
          marginHorizontal: 15,
          color: VARS.color.black,
        }}>
        {lang.development}
      </Text>
      <View
        style={{
          backgroundColor: VARS.color.white,
          borderRadius: 18,
          width: '100%',
          alignItems: 'flex-start',
          justifyContent: 'space-around',
          borderWidth: 1,
          borderColor: VARS.color.whiteDark,
          elevation: 10,
          padding: 18,
          marginBottom: 15,
          margin: 5,
          color: VARS.color.black,
          gap: 10,
        }}>
        <Text
          style={{
            width: '100%',
            fontFamily: 'fontBold',
            fontSize: 20,
            letterSpacing: 1,
            textAlign: 'center',
          }}>
          {lang.dgSystem}
        </Text>
        <Text
          style={{
            fontFamily: 'fontRegular',
            fontSize: 18,
            letterSpacing: 1,
            textAlign: 'justify',
          }}>
          {lang.dgNames}
        </Text>
        <Text
          style={{
            fontFamily: 'fontRegular',
            fontSize: 18,
            letterSpacing: 1,
            textAlign: 'justify',
          }}>
          {lang.dgContato}
        </Text>
      </View>
    </View>
  );
}
