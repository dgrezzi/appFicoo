import { Ionicons } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { VARS } from '../../constants/VARS';
import { AuthContext } from '../../contexts/auth';
import styles from '../../styles/styles';
import {
  dia12en,
  dia12es,
  dia12pt,
  dia13en,
  dia13es,
  dia13pt,
  dia14en,
  dia14es,
  dia14pt,
} from '../cursos/atividades';

const todos = [
  dia12en,
  dia12es,
  dia12pt,
  dia13en,
  dia13es,
  dia13pt,
  dia14en,
  dia14es,
  dia14pt,
];
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
        ? dia12en
        : locale == 'es'
        ? dia12es
        : null,
    dia13:
      locale == 'pt'
        ? dia13pt
        : locale == 'en'
        ? dia13en
        : locale == 'es'
        ? dia13es
        : null,
    dia14:
      locale == 'pt'
        ? dia14pt
        : locale == 'en'
        ? dia14en
        : locale == 'es'
        ? dia14es
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
            fontFamily: 'fontBold',
            fontSize: 18,
            letterSpacing: 1,
            color: props.active == aba ? VARS.color.white : VARS.color.gray,
          }}>
          {props.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const setProgramFirebase = async ({ colectionId, data }) => {
    console.log('colectionId:', colectionId);
    console.log('data:', data);
    console.log('objectKey:', Object.keys(data));
    return;
    await firestore()
      .collection('configs')
      .doc('languages')
      .collection(colectionId)
      .doc()
      .set(data)
      .then(() => {
        setId();
        setCheck('Checkin realizado com sucesso');
        setTimeout(() => {
          setCheck('');
        }, 2000);
      })
      .catch(err => {
        console.error('erro no banco:', err);
      });
    setId();
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
      {/* <TouchableOpacity
        onPress={() => {
          todos.map((item, index) => {
            console.log('objectKey:', todos['objectKey']);

            return;
            console.log(item); //item a ser cadastrado
            item.map((value, indice) => {
              console.log(value); //item a ser cadastrado
            });
          });
          return;
          const prog = {
            colectionId: 'teste',
            data: dia12en,
          };
          setProgramFirebase(prog);
        }}
        style={{ padding: 5, paddingHorizontal: 20, borderWidth: 1 }}>
        <Text>Cadastrar</Text>
      </TouchableOpacity> */}
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
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
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
            fontFamily: 'fontBold',
            fontSize: 18,
            color: VARS.color.title,
            letterSpacing: 1,
            flex: 1,
          }}>
          {props.data?.start} - {props.data?.finish}
        </Text>
      </View>

      <Text
        style={{
          fontFamily: 'fontRegular',
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
