import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { VARS } from '../../constants/VARS';
import { AuthContext } from '../../contexts/auth';
import styles from '../../styles/styles';

export default function Credentials() {
  const { dataContext } = useContext(AuthContext);

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
          paddingVertical: 15,
          paddingHorizontal: 18,
          justifyContent: 'flex-start',
        },
      ]}>
      <View
        style={{
          flex: 1,
          borderWidth: 1,
          backgroundColor: VARS.color.white,
          borderColor: VARS.color.whiteDark,
          elevation: 10,
          borderRadius: 32,
          width: '100%',
          justifyContent: 'space-around',
          alignItems: 'flex-start',
          padding: 18,
          paddingVertical: 30,
          gap: 10,
        }}>
        <Text
          style={{
            fontFamily: 'AbelBold',
            fontSize: 24,
            letterSpacing: 1,
            alignSelf: 'center',
            textAlign: 'center',
            width: '100%',
          }}>
          FICOO 2023
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
          Credencial + Painel + Oficina
        </Text>
        <View style={{ width: '100%', gap: 10 }}>
          <Dados
            data={{ label: 'Nome:', value: dataContext.storageData?.name }}
          />
          <Dados data={{ label: 'e-mail:', value: dataContext.user?.email }} />
        </View>
        <Dados
          data={{ label: 'Identificador:', value: dataContext.user?.uid }}
        />
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
    </View>
  );
}
