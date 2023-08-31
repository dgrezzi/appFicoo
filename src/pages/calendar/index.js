import { Ionicons } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { VARS } from '../../constants/VARS';
import { AuthContext } from '../../contexts/auth';
import styles from '../../styles/styles';

export default function Calendar() {
  const [aba, setAba] = useState(0);

  const { locale } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

  const prog = {
    dia12:
      locale == 'pt'
        ? dia12pt
        : locale == 'en'
        ? dia12pt
        : locale == 'es'
        ? dia12pt
        : null,
    dia13:
      locale == 'pt'
        ? dia13pt
        : locale == 'en'
        ? dia13pt
        : locale == 'es'
        ? dia13pt
        : null,
    dia14:
      locale == 'pt'
        ? dia14pt
        : locale == 'en'
        ? dia14pt
        : locale == 'es'
        ? dia14pt
        : null,
  };

  const Aba = props => {
    return (
      <TouchableOpacity
        onPress={() => props.onPress()}
        activeOpacity={0.6}
        style={{
          backgroundColor:
            props.active == aba ? VARS.color.orange : 'transparent',
          paddingHorizontal: 20,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 8,
          borderRadius: 100,
          elevation: props.active == aba ? 8 : 0,
        }}>
        <Text
          style={{
            fontFamily: 'AbelBold',
            fontSize: 18,
            letterSpacing: 1,
            color: props.active == aba ? VARS.color.white : VARS.color.gray,
          }}>
          {props.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          justifyContent: 'flex-start',
          paddingHorizontal: 0,
          gap: 15,
        },
      ]}>
      <View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderColor: VARS.color.whiteDark,
            borderRadius: 100,
            gap: 10,
            marginTop: 10,
            padding: 6,
            backgroundColor: VARS.color.white,
            elevation: 8,
          },
        ]}>
        <Aba
          label={'12/' + lang.month}
          aba="0"
          active="0"
          onPress={() => {
            setAba(0);
          }}
        />
        <Aba
          label={'13/' + lang.month}
          aba="1"
          active="1"
          onPress={() => {
            setAba(1);
          }}
        />
        <Aba
          label={'14/' + lang.month}
          aba="2"
          active="2"
          onPress={() => {
            setAba(2);
          }}
        />
      </View>
      <View
        style={{
          width: '100%',
          flex: 1,
        }}>
        {aba == 0 ? <Atividade dia={prog.dia12} /> : null}
        {aba == 1 ? <Atividade dia={prog.dia13} /> : null}
        {aba == 2 ? <Atividade dia={prog.dia14} /> : null}
      </View>
    </View>
  );
}

const Atividade = props => {
  return (
    <ScrollView
      contentContainerStyle={{ paddingVertical: 12, paddingHorizontal: 8 }}>
      {props.dia?.map((v, i) => {
        return <Dados key={i} data={v} />;
      })}
    </ScrollView>
  );
};

const Dados = props => {
  const cores = {
    1: VARS.color.white,
  };
  const group = props.data?.group;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 18,
        borderWidth: 1,
        marginHorizontal: 10,
        borderColor: VARS.color?.blueLight,
        backgroundColor: group ? cores[group] : VARS.color.white,
        borderRadius: 10,
        marginBottom: 12,
        elevation: 8,
        gap: 6,
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Ionicons
          name="time-outline"
          size={VARS.size.icons * 0.6}
          color={VARS.color.blue}
        />
        <Text
          style={{
            fontFamily: 'Abel',
            fontSize: 20,
            color: VARS.color.title,
            letterSpacing: 1,
            flex: 1,
          }}>
          {props.data?.start} - {props.data?.finish}
        </Text>
      </View>

      <Text
        style={{
          fontFamily: 'AbelBold',
          fontSize: 20,
          color: VARS.color.title,
          textAlign: 'justify',
          width: '100%',
          letterSpacing: 1,
        }}>
        {props.data?.title}
      </Text>
    </View>
  );
};

const dia12pt = [
  {
    id: 1,
    start: '14h00',
    finish: '18h00',
    title: 'Recepção, credenciamento e atividades de conexão',
    group: 1,
    local: 'Sala 2',
  },
  {
    id: 2,
    start: '18h00',
    finish: '19h00',
    title: 'Abertura do FICOO 2023',
    group: 1,
  },
  {
    id: 3,
    start: '19h00',
    finish: '20h30',
    title: 'Conferência 1',
    group: 1,
  },
  {
    id: 4,
    start: '20h30',
    finish: '21h00',
    title: 'Tempo Livre e Mercado Colaborativo',
    group: 1,
  },
  {
    id: 5,
    start: '21h00',
    finish: '21h30',
    title: 'O Encontro das Tribos',
    group: 1,
  },
  {
    id: 6,
    start: '21h30',
    finish: '22h00',
    title: 'Atividade de Celebração',
    group: 1,
  },
];

const dia13pt = [
  {
    id: 1,
    start: '08h30',
    finish: '09h00',
    title: 'Atividades de conexão',
    group: 1,
  },
  {
    id: 2,
    start: '09h00',
    finish: '10h30',
    title: 'Painel Colaborativo',
    group: 1,
  },

  {
    id: 3,
    start: '10h30',
    finish: '11h00',
    title: 'Tempo livre e Mercado Colaborativo',
    group: 1,
  },
  {
    id: 4,
    start: '11h00',
    finish: '13h00',
    title: 'Rodas de ConversAção',
    group: 1,
  },
  {
    id: 5,
    start: '11h00',
    finish: '13h00',
    title: 'Laboratório de Com-Vivências',
    group: 1,
  },
  {
    id: 6,
    start: '14h30',
    finish: '18h30',
    title: 'Oficinas de Cooperação',
    group: 1,
  },
  {
    id: 7,
    start: '18h30',
    finish: '19h00',
    title: 'Tempo livre e Mercado Colaborativo',
    group: 1,
  },
  {
    id: 8,
    start: '13h00',
    finish: '14h30',
    title: 'Tempo livre e Mercado Colaborativo',
    group: 1,
  },
  {
    id: 9,
    start: '19h00',
    finish: '20h30',
    title: 'O Desafio da Regeneração',
    group: 1,
  },
  {
    id: 10,
    start: '20h30',
    finish: '21h00',
    title: 'Atividade de Celebração',
    group: 1,
  },
];

const dia14pt = [
  {
    id: 1,
    start: '08h30',
    finish: '09h00',
    title: 'Atividades de conexão',
    group: 1,
  },
  {
    id: 2,
    start: '09h00',
    finish: '10h30',
    title: 'Conferência 2',
    group: 1,
  },
  {
    id: 3,
    start: '10h30',
    finish: '11h00',
    title: 'Tempo livre e Mercado Colaborativo',
    group: 1,
  },
  {
    id: 4,
    start: '11h00',
    finish: '13h00',
    title: 'Rodas de ConversAção',
    group: 1,
  },
  {
    id: 5,
    start: '11h00',
    finish: '13h00',
    title: 'Laboratório de Com-Vivências',
    group: 1,
  },
  {
    id: 6,
    start: '13h00',
    finish: '14h30',
    title: 'Tempo livre e Mercado Colaborativo',
    group: 1,
  },
  {
    id: 7,
    start: '14h30',
    finish: '18h30',
    title: 'Oficinas de Cooperação',
    group: 1,
  },
  {
    id: 8,
    start: '18h30',
    finish: '19h00',
    title: 'Tempo livre e Mercado Colaborativo',
    group: 1,
  },
  {
    id: 9,
    start: '19h00',
    finish: '20h30',
    title: 'A Grande Síntese',
    group: 1,
  },
  {
    id: 10,
    start: '20h30',
    finish: '22h00',
    title: 'Festa DIVER e Encerramento do Festival',
    group: 1,
  },
];
