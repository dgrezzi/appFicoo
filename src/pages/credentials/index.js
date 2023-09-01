import React, { useContext } from 'react';
import { ScrollView, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { VARS } from '../../constants/VARS';
import { AuthContext } from '../../contexts/auth';
import styles from '../../styles/styles';
import { legenda } from '../cursos/atividades';

export default function Credentials() {
  const { dataContext, locale } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

  const dados = {
    id: dataContext.user.uid,
    name: dataContext.storageData.name,
    email: dataContext.user.email,
  };
  const credential = JSON.stringify(dados);

  const Dados = ({ data }) => {
    return (
      <View>
        <Text
          style={{
            fontFamily: 'Abel',
            fontSize: 16,
            letterSpacing: 1,
            color: VARS.color.gray,
          }}>
          {data.label}
        </Text>

        <Text
          style={{
            fontFamily: 'AbelBold',
            fontSize: 20,
            letterSpacing: 1,
            color: VARS.color.black,
          }}>
          {data.value}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          gap: 0,
          justifyContent: 'flex-start',
          paddingHorizontal: 0,
        },
      ]}>
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 20,
          paddingVertical: 20,
          gap: 2,
        }}>
        <View
          style={{
            flex: 1,
            borderWidth: 1,
            backgroundColor: VARS.color.white,
            borderColor: VARS.color.whiteDark,
            elevation: 10,
            borderRadius: 32,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 18,
            paddingVertical: 30,
            gap: 30,
          }}>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'AbelBold',
                fontSize: 24,
                letterSpacing: 1,
                alignSelf: 'center',
                textAlign: 'center',
                width: '100%',
                color: VARS.color.black,
              }}>
              {lang.labelFicoo}
            </Text>
            <Text
              style={{
                fontFamily: 'AbelBold',
                fontSize: 20,
                letterSpacing: 1,
                alignSelf: 'center',
                textAlign: 'center',
                width: '100%',
              }}>
              {lang.credOficina}
            </Text>
          </View>
          <View style={{ width: '100%', gap: 10 }}>
            <Dados
              data={{
                label: lang.labelName,
                value: dataContext.storageData?.name,
              }}
            />
            <Dados
              data={{ label: lang.labelEmail, value: dataContext.user?.email }}
            />
            <Dados
              data={{ label: lang.identify, value: dataContext.user?.uid }}
            />
          </View>
          <View style={{ gap: 10 }}>
            <Dados
              data={{
                label: lang.oficina1,
                value: formatLetter(
                  legenda[dataContext.storageData?.oficina1]?.slice(0, 28) +
                    '...',
                ),
              }}
            />
            <Dados
              data={{
                label: lang.oficina2,
                value: formatLetter(
                  legenda[dataContext.storageData?.oficina2]?.slice(0, 28) +
                    '...',
                ),
              }}
            />
          </View>
        </View>
        <View
          style={{
            borderStyle: 'dashed',
            borderWidth: 1,
            width: '85%',
            borderColor: VARS.color.gray,
          }}
        />
        <View
          style={{
            borderWidth: 1,
            elevation: 10,
            backgroundColor: VARS.color.white,
            borderColor: VARS.color.whiteDark,
            borderRadius: 32,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 30,
          }}>
          <QRCode value={credential} backgroundColor="transparent" size={200} />
        </View>
      </ScrollView>
    </View>
  );
}

function formatLetter(str) {
  const lowerCaseString = str.toLowerCase();
  return lowerCaseString.replace(/\b\w/g, l => l.toUpperCase());
}
