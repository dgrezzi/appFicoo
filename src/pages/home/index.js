import React, { useContext } from 'react';
import { Image, ScrollView, View } from 'react-native';
import destaque from '../../assets/exemplo.png';
import faixa from '../../assets/ficoo_faixas.png';
import Carrossel from '../../components/Carrossel';
import { AuthContext } from '../../contexts/auth';
import styles from '../../styles/styles';

export default function Home() {
  const { locale } = useContext(AuthContext);

  let dic = require('../../dic/lang.json');
  let lang = dic[locale];
  const dados = [destaque, destaque, destaque, destaque];

  return (
    <View
      style={[
        styles.container,
        {
          alignItems: 'flex-start',
          paddingHorizontal: 12,
          paddingTop: 20,
        },
      ]}>
      <Image style={{ width: '100%', resizeMode: 'cover' }} source={faixa} />
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 8,
          gap: 10,
        }}>
        <Carrossel label="O FICOO" data={dados} />
        <Carrossel label="Conferências" data={dados} />
        <Carrossel label="Painéis Colaborativos" data={dados} />
        <Carrossel label="Oficinas de cooperação" data={dados} />
        <Carrossel label="Festa DIVER e desafio FICOO" data={dados} />
        <Carrossel label="Parceiros" data={dados} />
        <Carrossel label="Loja FICOO" data={dados} />
      </ScrollView>
    </View>
  );
}
