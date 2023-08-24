import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
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
import exclamation from '../../assets/exclamation.png';
import Btn from '../../components/Btn/intex';
import { VARS } from '../../constants/VARS';
import styles from '../../styles/styles';

export default function Cursos() {
  const [input, setInput] = useState();
  const [aba, setAba] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState();

  const Title = props => {
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

  const SubTitle = props => {
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

  const Aba = props => {
    return (
      <TouchableOpacity
        onPress={() => props.onPress()}
        activeOpacity={0.6}
        style={{
          backgroundColor:
            props.active == aba ? VARS.color.white : 'transparent',
          paddingHorizontal: 45,
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
            color:
              props.active == aba ? VARS.color.title : VARS.color.whiteDark,
          }}>
          {props.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const SelectBox = () => {
    return (
      <View
        style={{
          borderRadius: 30,
          borderWidth: 1,
          borderColor: VARS.color.blueLight,
          paddingHorizontal: 5,
          elevation: 10,
          backgroundColor: VARS.color.white,
          marginBottom: 10,
        }}>
        <Picker
          selectedValue={selectedLanguage}
          mode="dropdown"
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }>
          <Picker.Item
            label="Painel 1"
            value="Painel 1"
            style={{
              fontFamily: 'Abel',
              letterSpacing: 1,
              fontSize: 18,
            }}
          />
          <Picker.Item
            label="Painel 2"
            value="Painel 2"
            style={{
              fontFamily: 'Abel',
              letterSpacing: 1,
              fontSize: 18,
            }}
          />
        </Picker>
      </View>
    );
  };

  const Paineis = () => {
    return (
      <View
        style={{
          width: '100%',
          gap: 10,
        }}>
        <Text
          style={{ fontFamily: 'AbelBold', fontSize: 28, letterSpacing: 1 }}>
          Paineis
        </Text>

        {/* //Inserir selectBox */}
        <SelectBox />

        <Atividade
          time="Dia 13 de outubro • 13:00 as 16:30"
          title="Saúde Integral na Educação e Cultura de Paz"
          owner="FÁBIO EON e HELENA MARUJO"
        />
        <Atividade
          time="Dia 13 de outubro • 9:00 as 10:30"
          title="Cultura de Paz e Saúde Integral na Educação"
          owner="HELENA MARUJO e FÁBIO EON"
        />
      </View>
    );
  };
  const Oficinas = () => {
    return (
      <View
        style={{
          width: '100%',
          gap: 10,
        }}>
        <Text
          style={{ fontFamily: 'AbelBold', fontSize: 28, letterSpacing: 1 }}>
          Oficinas
        </Text>

        {/* //Inserir selectBox */}
        {/* //Inserir selectBox */}

        <Atividade
          time="Dia 14 de outubro • 9:00 as 10:30"
          title="Neurociências, Biologia Evolutiva e o Educar para a vida: Regenerar para não Degenerar"
          owner="ISABELA CREMA"
        />
        <Atividade
          time="Dia 14 de outubro • 13:00 as 16:30"
          title="Saúde Integral na Educação e Cultura de Paz"
          owner="FÁBIO EON e HELENA MARUJO"
        />
      </View>
    );
  };

  const Atividade = props => {
    return (
      <View
        style={{
          width: '100%',
          backgroundColor: VARS.color.white,
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
              fontSize: 18,
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
      </View>
    );
  };

  const Confirmation = props => {
    {
      return (
        <View style={{ flexDirection: 'row', width: '100%', flex: 1, gap: 8 }}>
          <Text
            style={{
              fontFamily: 'Abel',
              fontSize: 20,
              letterSpacing: 1,
              color: VARS.color.title,
            }}>
            {props.opt}:
          </Text>
          <Text
            style={{
              fontFamily: 'AbelBold',
              fontSize: 20,
              letterSpacing: 1,
              color: VARS.color.title,
            }}>
            {props.label}
          </Text>
        </View>
      );
    }
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
          <View
            style={[
              styles.container,
              { gap: 10, paddingHorizontal: 0, marginBottom: 30 },
            ]}>
            <View
              style={{
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
              <SubTitle label="01 oficina para o dia 13" />
              <SubTitle label="01 oficina para o dia 14" />
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
            <View
              style={{
                width: '100%',
                paddingHorizontal: 15,
                flex: 1,
              }}>
              <View
                style={[
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderColor: VARS.color.whiteDark,
                    borderRadius: 100,
                    gap: 10,
                    padding: 6,
                    backgroundColor: VARS.color.white,
                    elevation: 8,
                    marginBottom: 15,
                  },
                ]}>
                <Aba
                  label="PAINEIS"
                  aba="0"
                  active="0"
                  onPress={() => {
                    setAba(0);
                  }}
                />
                <Aba
                  label="OFICINAS"
                  aba="1"
                  active="1"
                  onPress={() => {
                    setAba(1);
                  }}
                />
              </View>
              <View style={{ flex: 1 }}>
                {aba == 0 ? <Paineis /> : <Oficinas />}
              </View>
            </View>
            <View
              style={{
                width: '100%',
                flex: 1,
                padding: 15,
              }}>
              <View
                style={{
                  padding: 15,
                  borderWidth: 1,
                  gap: 10,
                  borderColor: VARS.color.whiteDark,
                  borderRadius: 18,
                  elevation: 10,
                  backgroundColor: VARS.color.white,
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontFamily: 'AbelBold',
                    fontSize: 22,
                    letterSpacing: 1,
                    color: VARS.color.title,
                  }}>
                  Confirmação
                </Text>
                <Confirmation opt="Painel" label={selectedLanguage} />
              </View>
            </View>

            <Btn
              label="Salvar"
              color={VARS.color.blue}
              icon="checkmark-circle-outline"
              iconSize={VARS.size.icons * 0.8}
              iconColor={VARS.color.white}
              onPress={() => {}}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
