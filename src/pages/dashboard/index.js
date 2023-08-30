import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import ficoo from '../../assets/logoFicoo23.png';
import { VARS } from '../../constants/VARS';
import styles from '../../styles/styles';

const storage = new MMKV({ id: 'appFicoo' });

const Links = props => {
  const data = props.data;
  return (
    <TouchableOpacity
      onPress={() => props?.onPress()}
      style={{
        width: '100%',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: VARS.color.blueLight,
        elevation: 10,
        backgroundColor: data.bgColor,
        aspectRatio: 6,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={[
          {
            fontFamily: 'Abel',
            fontSize: 22,
            letterSpacing: 1,
            color: data.color,
          },
        ]}>
        {data.label}
      </Text>
    </TouchableOpacity>
  );
};

export default function Dashboard() {
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.container,
        {
          justifyContent: 'flex-start',
          paddingHorizontal: 0,
        },
      ]}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingVertical: 30,
          gap: 20,
        }}>
        <Image
          style={{
            height: 250,
            backgroundColor: 'transparent',
            resizeMode: 'contain',
            margin: 15,
          }}
          source={ficoo}
        />

        <Links
          onPress={() => {
            navigation.navigate('checkin');
          }}
          data={{
            label: 'Check in no evento',
            bgColor: VARS.color.white,
            color: VARS.color.title,
          }}
        />
        <Links
          onPress={() => {
            navigation.navigate('ListUser');
          }}
          data={{
            label: 'Participantes',
            bgColor: VARS.color.white,
            color: VARS.color.title,
          }}
        />
        <Links
          onPress={() => {
            navigation.navigate('Credenciamento');
          }}
          data={{
            label: 'Paineis e Oficinas',
            bgColor: VARS.color.white,
            color: VARS.color.title,
          }}
        />
        <Links
          onPress={() => {
            navigation.navigate('makeAdmin');
          }}
          data={{
            label: 'Multiplicador de Admins',
            bgColor: VARS.color.white,
            color: VARS.color.title,
          }}
        />
        {/* <TouchableOpacity
        onPress={() => {
          storage.clearAll();
        }}>
        <Text>Teste</Text>
      </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
}
