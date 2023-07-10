import React, { useContext } from 'react';
import { Image, Text, View } from 'react-native';
import parceiros from '../../assets/parceiros.png';
import { AuthContext } from '../../contexts/auth';
import globalStyles from '../../styles/globalStyles';
import homeStyles from '../../styles/homeStyles';

export default function Home() {
  const { locale } = useContext(AuthContext);

  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

  return (
    <View style={[globalStyles.center]}>
      <View style={homeStyles.dest1}>
        <View style={homeStyles.destcard}>
          <Text>Teste</Text>
        </View>
        <View style={homeStyles.destcard}>
          <Text>Teste</Text>
        </View>
        <View style={homeStyles.destcard}>
          <Text>Teste</Text>
        </View>
      </View>
      <View style={homeStyles.dest2}>
        <View style={homeStyles.card}>
          <Text>Teste</Text>
        </View>
        <View style={homeStyles.card}>
          <Text>Teste</Text>
        </View>
        <View style={homeStyles.card}>
          <Text>Teste</Text>
        </View>
      </View>
      <View style={homeStyles.parc}>
        <Image style={homeStyles.parcFlag} source={parceiros} />
        <Image style={homeStyles.parcFlag} source={parceiros} />
        <Image style={homeStyles.parcFlag} source={parceiros} />
      </View>
    </View>
  );
}
