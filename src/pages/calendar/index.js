import { Ionicons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Loading from '../../components/Loading';
import { VARS } from '../../constants/VARS';
import { AuthContext } from '../../contexts/auth';
import styles from '../../styles/styles';

export default function Calendar() {
  const [aba, setAba] = useState(0);
  const [dia12, setDia12] = useState();
  const [dia13, setDia13] = useState();
  const [dia14, setDia14] = useState();
  const [loading, setLoading] = useState(true);

  const { locale } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

  useEffect(() => {
    getProgram();
  }, [locale]);

  const getProgram = async () => {
    const prog12 = [];
    const prog13 = [];
    const prog14 = [];
    await firestore()
      .collection('configs')
      .doc('programacao')
      .collection('dia12' + locale)
      .orderBy('start', 'asc')
      .get()
      .then(result => {
        result.forEach(doc => {
          prog12.push(doc.data());
        });
        return null;
      })
      .catch(err => {
        console.error('erro no banco:', err);
      });
    await firestore()
      .collection('configs')
      .doc('programacao')
      .collection('dia13' + locale)
      .orderBy('start', 'asc')
      .get()
      .then(result => {
        result.forEach(doc => {
          prog13.push(doc.data());
        });
        return null;
      })
      .catch(err => {
        console.error('erro no banco:', err);
      });
    await firestore()
      .collection('configs')
      .doc('programacao')
      .collection('dia14' + locale)
      .orderBy('start', 'asc')
      .get()
      .then(result => {
        result.forEach(doc => {
          prog14.push(doc.data());
        });
        return null;
      })
      .catch(err => {
        console.error('erro no banco:', err);
      });
    setDia12(prog12);
    setDia13(prog13);
    setDia14(prog14);
    setLoading(false);
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
      {loading && <Loading />}
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
        {aba == 0 ? <Atividade dia={dia12} /> : null}
        {aba == 1 ? <Atividade dia={dia13} /> : null}
        {aba == 2 ? <Atividade dia={dia14} /> : null}
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
