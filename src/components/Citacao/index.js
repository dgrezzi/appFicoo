import { useContext, useState } from 'react';
import { Text, View } from 'react-native';
import { VARS } from '../../constants/VARS';
import { AuthContext } from '../../contexts/auth';

export default function Citacao({ info }) {
  const [image, setImage] = useState();
  const [aspect, setAspect] = useState();

  const { locale } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

  return (
    <View
      style={{
        backgroundColor: VARS.color.white,
        borderRadius: 18,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: VARS.color.whiteDark,
        elevation: 10,
        padding: 10,
        paddingHorizontal: 25,
        marginBottom: 15,
        margin: 5,
        color: VARS.color.black,
      }}>
      <Text
        style={{ fontFamily: 'fontRegular', letterSpacing: 1, fontSize: 16 }}>
        {info.name}
      </Text>
    </View>
  );
}
