import { Ionicons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import logo from '../../../assets/icon.png';
import exclamation from '../../assets/exclamation.png';
import { VARS } from '../../constants/VARS';
import { legenda } from './atividades';

export const Title = props => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text
        style={{
          fontFamily: 'AbelBold',
          width: '100%',
          color: VARS.color.white,
          textAlign: 'center',
          fontSize: 24,
          letterSpacing: 1,
        }}>
        {props.label}
      </Text>
      <Text
        style={{
          fontFamily: 'Abel',
          color: VARS.color.white,
          fontSize: 18,
          width: '100%',
          textAlign: 'center',
          letterSpacing: 1,
        }}>
        {props.legend}
      </Text>
    </View>
  );
};

export const SubTitle = props => {
  return (
    <Text
      style={{
        fontFamily: 'Abel',
        color: VARS.color.white,
        fontSize: 20,
        width: '100%',
        textAlign: 'center',
        letterSpacing: 1,
      }}>
      {props.label}
    </Text>
  );
};

export const Aviso = () => {
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 25,
        paddingHorizontal: 12,
        backgroundColor: VARS.color.orange,
        borderBottomRightRadius: 48,
        borderBottomLeftRadius: 48,
        gap: 8,
      }}>
      <Title label="INSCRIÇÃO OBRIGATÓRIA" legend="(vagas limitadas)" />
      <SubTitle label="01 Painel Colaborativo" />
      <SubTitle label="02 Oficinas" />
      {/* <SubTitle label="(Dia 23 e Dia 14)" /> */}
      <Image
        style={{
          width: VARS.size.avatar / 3,
          height: VARS.size.avatar / 3,
          borderRadius: VARS.size.avatar,
          margin: 8,
          borderWidth: 0,
          borderColor: VARS.color.whiteDark,
          position: 'absolute',
          bottom: 30,
          right: 20,
        }}
        source={exclamation}
      />
    </View>
  );
};

export const Botoes = ({ abaChange }) => {
  const [active, setActive] = useState(1);
  const handleChange = event => {
    setActive(event);
    abaChange(event);
  };

  const Aba = props => {
    return (
      <TouchableOpacity
        onPress={() => props.onPress()}
        activeOpacity={0.6}
        style={{
          backgroundColor:
            props.aba == active ? VARS.color.orangeLight : VARS.color.white,
          paddingHorizontal: 20,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: VARS.color.orangeLight,
          padding: 6,
          borderRadius: 20,
          elevation: props.aba == active ? 8 : 0,
        }}>
        <Text
          style={{
            fontFamily: 'AbelBold',
            fontSize: 16,
            letterSpacing: 1,
            color:
              props.aba == active ? VARS.color.white : VARS.color.orangeLight,
          }}>
          {props.label}
        </Text>
        {props.label2 && (
          <Text
            style={{
              fontFamily: 'AbelBold',
              fontSize: 16,
              letterSpacing: 1,
              color:
                props.aba == active ? VARS.color.white : VARS.color.orangeLight,
            }}>
            {props.label2}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        {
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderColor: VARS.color.whiteDark,
          borderRadius: 25,
          gap: 10,
          padding: 6,
          backgroundColor: VARS.color.white,
          elevation: 8,
          marginBottom: 15,
        },
      ]}>
      <Aba
        label="PAINEIS"
        aba="1"
        onPress={() => {
          handleChange(1);
        }}
      />
      <Aba
        label="OFICINAS"
        label2="13/10"
        aba="2"
        onPress={() => {
          handleChange(2);
        }}
      />
      <Aba
        label="OFICINAS"
        label2="14/10"
        aba="3"
        onPress={() => {
          handleChange(3);
        }}
      />
    </View>
  );
};

export const Atividades = ({ atividadeChange, ...props }) => {
  const [qtdActive, setQtdActive] = useState();
  const handleChange = event => {
    atividadeChange(props.id);
  };

  const checkVacancy = async () => {
    const inscritos = [];
    if (props.dia) {
      await firestore()
        .collection('checkin')
        .doc(props.id)
        .collection(props.dia)
        .get()
        .then(result => {
          result.forEach(doc => {
            doc.data().uid = doc.id;
            inscritos.push(doc.data());
          });
          const quant = parseInt(inscritos.length);
          const total = props.vaga - quant;
          if (props.selected && total <= 0) handleChange();
          setQtdActive(total);
          return;
        })
        .catch(err => {
          console.log(err);
        });
      return;
    }
    if (!props.dia) {
      await firestore()
        .collection('checkin')
        .doc(props.id)
        .collection('users')
        .get()
        .then(result => {
          result.forEach(doc => {
            doc.data().uid = doc.id;
            inscritos.push(doc.data());
          });
          const quant = parseInt(inscritos.length);
          const total = props.vaga - quant;
          if (props.selected && total <= 0) handleChange();
          setQtdActive(total);
          return;
        })
        .catch(err => {
          console.log(err);
        });
      return;
    }
  };

  useEffect(() => {
    if (props.editable) Promise.all(checkVacancy());
  }, [props]);

  return (
    <View style={{ paddingHorizontal: 15 }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          if (qtdActive > 0) props.onPress();
          if (qtdActive <= 0) alert('Vagas esgotadas');
        }}
        style={{
          width: '100%',
          backgroundColor: props.selected
            ? VARS.color.orangeLight
            : VARS.color.white,
          flexDirection: 'row',
          borderRadius: 18,
          alignItems: 'center',
          borderWidth: 1,
          borderColor: VARS.color.blueLight,
          elevation: 10,
          marginBottom: 10,
          padding: 8,
          paddingVertical: 12,
        }}>
        {props.editable && (
          <Text style={{ position: 'absolute', top: 10, left: 12 }}>
            {qtdActive} vaga(s)
          </Text>
        )}
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
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
                fontSize: 14,
                color: VARS.color.blue,
                letterSpacing: 1,
                marginRight: 10,
              }}>
              {props.id}
            </Text>
          </View>
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
    </View>
  );
};

export const Confirmacao = ({ data }) => {
  const { painel, oficina1, oficina2 } = data;

  const Dados = data => {
    return (
      <View
        style={{
          // flexDirection: 'row',
          gap: 4,
          alignItems: 'flex-start',
        }}>
        <Text
          style={{
            fontFamily: 'AbelBold',
            flex: 1,
            width: '100%',
            fontSize: 20,
            textAlign: 'justify',
            letterSpacing: 1,
            color: VARS.color.title,
          }}>
          {data.label}
          <Text
            style={{
              fontFamily: 'Abel',
              flex: 1,
              width: '100%',
              fontSize: 20,
              letterSpacing: 1,
              color: VARS.color.title,
            }}>
            {data.value}
          </Text>
        </Text>
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            alignItems: 'center',
            width: '100%',
          }}>
          <Ionicons
            name="location-outline"
            size={VARS.size.icons * 0.6}
            color={VARS.color.blue}
          />
          <Text
            style={{
              fontFamily: 'Abel',
              fontSize: 20,
              letterSpacing: 1,
              color: VARS.color.title,
            }}>
            {data.local}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: 15,
        padding: 10,
      }}>
      <View
        style={{
          width: '100%',
          backgroundColor: VARS.color.whiteDark,
          borderWidth: 1,
          borderColor: VARS.color.whiteDark,
          borderRadius: 20,
          padding: 12,
          paddingVertical: 20,
          gap: 20,
          elevation: 8,
        }}>
        <Text
          style={{
            fontFamily: 'AbelBold',
            fontSize: 20,
            letterSpacing: 1,
            color: VARS.color.title,
          }}>
          CONFIRMAÇÃO
        </Text>
        {data.painel ? (
          <Dados
            label="Painel: "
            value={legenda[data.painel]?.slice(0, 60) + '...'}
            local="Sala X"
          />
        ) : null}
        {data.painel ? (
          <Dados
            label="Oficina 13/10: "
            value={formatLetter(legenda[data.oficina1]?.slice(0, 60) + '...')}
            local="Sala X"
          />
        ) : null}
        {data.painel ? (
          <Dados
            label="Oficina 14/10: "
            value={formatLetter(legenda[data.oficina2]?.slice(0, 60) + '...')}
            local="Sala X"
          />
        ) : null}
      </View>
    </View>
  );
};

function formatLetter(str) {
  const lowerCaseString = str.toLowerCase();
  return lowerCaseString.replace(/\b\w/g, l => l.toUpperCase());
}
