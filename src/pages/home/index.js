import React, { useContext } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import globalStyles from '../../styles/globalStyles';
import homeStyles from '../../styles/homeStyles';

import destaque from '../../assets/destaque.jpg';
import destaqueH from '../../assets/destaqueH.png';
import parceiros from '../../assets/parceiros.png';

export default function Home() {
  const { locale } = useContext(AuthContext);

  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

  return (
    <View style={[globalStyles.center]}>
      <ScrollView style={homeStyles.destaque1} horizontal={true}>
        <Image style={homeStyles.cardDestaque1} source={destaqueH} />
        <Image style={homeStyles.cardDestaque1} source={destaqueH} />
        <Image style={homeStyles.cardDestaque1} source={destaqueH} />
      </ScrollView>
      <ScrollView style={homeStyles.destaque2} horizontal={true}>
        <Image style={homeStyles.cardDestaque2} source={destaque} />
        <Image style={homeStyles.cardDestaque2} source={destaque} />
        <Image style={homeStyles.cardDestaque2} source={destaque} />
        <Image style={homeStyles.cardDestaque2} source={destaque} />
        <Image style={homeStyles.cardDestaque2} source={destaque} />
      </ScrollView>
      <ScrollView style={homeStyles.parceiros} horizontal={true}>
        <Image style={homeStyles.parcFlag} source={parceiros} />
        <Image style={homeStyles.parcFlag} source={parceiros} />
        <Image style={homeStyles.parcFlag} source={parceiros} />
        <Image style={homeStyles.parcFlag} source={parceiros} />
        <Image style={homeStyles.parcFlag} source={parceiros} />
        <Image style={homeStyles.parcFlag} source={parceiros} />
        <Image style={homeStyles.parcFlag} source={parceiros} />
        <Image style={homeStyles.parcFlag} source={parceiros} />
      </ScrollView>
    </View>
  );
}
