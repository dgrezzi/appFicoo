import { Ionicons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import logo from '../../../assets/icon.png';
import Btn from '../../components/Btn/intex';
import { VARS } from '../../constants/VARS';
import { AuthContext } from '../../contexts/auth';
import styles from '../../styles/styles';
import { Aviso } from './structure';

export default function Cursos() {
  const { dataContext } = useContext(AuthContext);
  const [aba, setAba] = useState(0);
  const [painel, setPainel] = useState('');
  const [oficina1, setOficina1] = useState('');
  const [oficina2, setOficina2] = useState('');
  const [vagaPainel1, setVagaPainel1] = useState(20);

  const inscricao = {
    painel: {
      1: 'painel1',
      2: 'painel2',
    },
    oficina1: {
      1: 'dia13oficina1',
      2: 'dia13oficina2',
    },
    oficina2: {
      1: 'dia14oficina1',
      2: 'dia14oficina2',
      3: 'dia14oficina3',
    },
  };

  useEffect(() => {
    const teste = async () => {
      // setVagaPainel1(20 - (await checkVacancy(inscricao.painel['0'])));
    };
    teste();
  }, []);

  const checkVacancy = async vaga => {
    const vagas = [];
    await firestore()
      .collection('checkin')
      .doc(vaga)
      .collection('users')
      .get()
      .then(result => {
        result.forEach(doc => {
          doc.data().uid = doc.id;
          vagas.push(doc.data());
        });
        const info = result._data;
        const quant = vagas.length;
        return quant;
      })
      .catch(err => {
        console.log(err);
      });
    return vagas.length;
  };

  const setPainelFirebase = async doc => {
    await firestore()
      .collection('checkin')
      .doc(doc)
      .collection('users')
      .doc(dataContext.user?.uid)
      .set({
        createdAt: new Date(),
        name: dataContext.user?.uid,
        email: dataContext.storageData?.email,
      })
      .then(() => {})
      .catch(err => {
        console.error('erro no banco:', err);
      });
  };

  const Paineis = () => {
    return (
      <View
        style={{
          width: '100%',
          gap: 10,
        }}>
        <Text
          style={{ fontFamily: 'AbelBold', fontSize: 24, letterSpacing: 1 }}>
          Selecione um painel
        </Text>

        <Atividade
          time="Dia 13 de outubro • 09h00 – 10h30"
          title="Cultura de Paz e Saúde Integral na Educação"
          owner="HELENA MARUJO, FÁBIO EON e MICHELLE CONFESSOR"
          vagas={vagaPainel1}
          id="1"
          type="painel"
          onPress={() => {
            setPainel('1');
          }}
        />
        <Atividade
          time="Dia 13 de outubro • 09h00 – 10h30"
          title="Boas Práticas de Inovação Social e Gestão Organizacional"
          owner="CAÇADORES DE BONS EXEMPLOS e WiLSON NOBRE"
          type="painel"
          vagas={vagaPainel1}
          id="2"
          onPress={() => {
            setPainel('2');
          }}
        />
      </View>
    );
  };

  const Oficinas = () => {
    return (
      <View
        style={{
          width: '100%',
          gap: 20,
        }}>
        <View
          style={{
            width: '100%',
            gap: 10,
          }}>
          <Text
            style={{ fontFamily: 'AbelBold', fontSize: 24, letterSpacing: 1 }}>
            Oficina para dia 13
          </Text>
          <Atividade
            time="Dia 13 de outubro • 09h00 – 10h30"
            title="Boas Práticas de Inovação Social e Gestão Organizacional"
            owner="CAÇADORES DE BONS EXEMPLOS e WiLSON NOBRE"
            id="0"
            type="oficina1"
            onPress={() => {
              setOficina1('0');
            }}
          />
          <Atividade
            time="Dia 13 de outubro • 09h00 – 10h30"
            title="Boas Práticas de Inovação Social e Gestão Organizacional"
            owner="CAÇADORES DE BONS EXEMPLOS e WiLSON NOBRE"
            id="1"
            type="oficina1"
            onPress={() => {
              setOficina1('1');
            }}
          />
        </View>
        <View
          style={{
            width: '100%',
            gap: 10,
          }}>
          <Text
            style={{ fontFamily: 'AbelBold', fontSize: 28, letterSpacing: 1 }}>
            Oficina para dia 14
          </Text>
          <Atividade
            time="Dia 13 de outubro • 09h00 – 10h30"
            title="Boas Práticas de Inovação Social e Gestão Organizacional"
            owner="CAÇADORES DE BONS EXEMPLOS e WiLSON NOBRE"
            id="0"
            type="oficina2"
            onPress={() => {
              setOficina2('0');
            }}
          />
          <Atividade
            time="Dia 13 de outubro • 09h00 – 10h30"
            title="Boas Práticas de Inovação Social e Gestão Organizacional"
            owner="CAÇADORES DE BONS EXEMPLOS e WiLSON NOBRE"
            id="1"
            type="oficina2"
            onPress={() => {
              setOficina2('1');
            }}
          />
          <Atividade
            time="Dia 13 de outubro • 09h00 – 10h30"
            title="Boas Práticas de Inovação Social e Gestão Organizacional"
            owner="CAÇADORES DE BONS EXEMPLOS e WiLSON NOBRE"
            id="2"
            type="oficina2"
            onPress={() => {
              setOficina2('2');
            }}
          />
        </View>
      </View>
    );
  };

  const Atividade = props => {
    if (props.type == 'painel') {
      var selected = painel;
    }
    if (props.type == 'oficina1') {
      var selected = oficina1;
    }
    if (props.type == 'oficina2') {
      var selected = oficina2;
    }
    vagas = props.vagas ? props.vagas : 20;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={props.onPress}
        style={{
          width: '100%',
          backgroundColor:
            selected == props.id ? VARS.color.orangeLight : VARS.color.white,
          flexDirection: 'row',
          borderRadius: 18,
          alignItems: 'center',
          borderWidth: 1,
          borderColor: VARS.color.blueLight,
          elevation: 10,
          marginTop: 5,
          marginBottom: 10,
          padding: 8,
          paddingVertical: 12,
        }}>
        <Text style={{ position: 'absolute', top: 8, left: 12 }}>
          {vagas} vaga(s)
        </Text>
        <Image
          style={{
            width: VARS.size.avatar / 1.8,
            height: VARS.size.avatar / 1.8,
            borderRadius: VARS.size.avatar,
            margin: 8,
          }}
          source={logo}
        />
        <View style={{ flex: 1, gap: 10 }}>
          <Text
            style={{
              fontFamily: 'Abel',
              fontSize: 14,
              color: VARS.color.blue,
              letterSpacing: 1,
            }}>
            {props.time}
          </Text>
          <Text
            style={{
              fontFamily: 'Abel',
              fontSize: 20,
              color: VARS.color.title,
              letterSpacing: 1,
            }}>
            {props.title}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Ionicons
              name="people-outline"
              size={VARS.size.icons * 0.8}
              color={VARS.color.blue}
            />
            <Text
              style={{
                fontFamily: 'Abel',
                fontSize: 14,
                color: VARS.color.title,
                letterSpacing: 1,
                flex: 1,
              }}>
              {props.owner}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: VARS.color.white, paddingHorizontal: 0 },
      ]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        style={[
          styles.keyboardAvoidingView,
          {
            width: '100%',
            backgroundColor: 'transparent',
          },
        ]}>
        <ScrollView>
          {/* <View
            style={[
              styles.container,
              { gap: 10, paddingHorizontal: 0, marginBottom: 30 },
            ]}> */}
          <Aviso />

          <Btn
            label="Salvar"
            color={VARS.color.blue}
            icon="checkmark-circle-outline"
            iconSize={VARS.size.icons * 0.8}
            iconColor={VARS.color.white}
            disable={!painel || !oficina1 || !oficina2 ? true : false}
            onPress={async () => {
              painel &&
                oficina1 &&
                oficina2 &&
                console.log(
                  inscricao.painel[painel],
                  inscricao.oficina1[oficina1],
                  inscricao.oficina2[oficina2],
                );
            }}
          />
          {/* </View> */}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
