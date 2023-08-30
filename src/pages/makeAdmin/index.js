import { Ionicons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Btn from '../../components/Btn/intex';
import { VARS } from '../../constants/VARS';
import styles from '../../styles/styles';

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

export default function MakeAdmin() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scan, setScan] = useState(false);
  const scanned = false;
  const [id, setId] = useState();
  const [check, setCheck] = useState('');

  const dados = {
    id: '3qiJcWI0TXetSf78zLz7EPuuk372',
    name: 'Daniel Lima',
    email: 'teste@email.com',
  };
  const credential = JSON.stringify(dados);

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const make = async info => {
    await firestore()
      .collection('user')
      .doc(info.id)
      .update({ isAdmin: true })
      .then(result => {
        console.log(result);
        const info = result._data;
        return null;
      })
      .catch(err => {
        console.log(err);
      });
    setId();
  };

  const handleBarCodeScanned = ({ data }) => {
    try {
      setId(JSON.parse(data));
    } catch {
      setId();
    }
    setScan(false);
  };

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == 'granted');
    })();
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          gap: 10,
          paddingHorizontal: 0,
          justifyContent: 'space-around',
        },
      ]}>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: 50,
          paddingTop: 10,
        }}
        style={{
          width: '100%',
          paddingHorizontal: 20,
          paddingVertical: 15,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            aspectRatio: '0.8',
            width: '70%',
            overflow: 'hidden',
            borderRadius: 38,
            borderWidth: 1,
            borderColor: 'gray',
            gap: 10,
            elevation: 10,
            backgroundColor: VARS.color.white,
          }}>
          {scan ? (
            <BarCodeScanner
              onBarCodeScanned={
                scanned ? undefined : result => handleBarCodeScanned(result)
              }
              style={{
                width: '100%',
                aspectRatio: 0.5,
                borderRadius: 50,
                zIndex: 99,
              }}
            />
          ) : (
            <TouchableOpacity
              onPress={() => {
                setTimeout(() => {
                  setScan(false);
                }, 6000);
                setScan(!scan);
              }}
              style={{
                backgroundColor: 'transparent',
                height: '100%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              activeOpacity={0.8}>
              <Text
                style={{ fontSize: 22, fontFamily: 'Abel', letterSpacing: 2 }}>
                Press for Scan
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            width: '100%',
            alignItems: 'flex-start',
            gap: 8,
            marginVertical: 20,
          }}>
          <Dados data={{ label: 'Nome:', value: id?.name }} />
          <Dados data={{ label: 'e-mail:', value: id?.email }} />
          <Dados data={{ label: 'Ientificador:', value: id?.id }} />
        </View>
        {check && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ionicons name="checkmark-done-outline" size={22} color={'green'} />
            <Text
              style={{
                fontSize: 22,
                fontFamily: 'Abel',
                letterSpacing: 1,
                marginHorizontal: 10,
              }}>
              {check}
            </Text>
          </View>
        )}

        <Btn
          label="Gerar Admin"
          color={VARS.color.blue}
          icon="checkmark-circle-outline"
          iconColor={VARS.color.white}
          iconSize={VARS.size.icons * 0.8}
          onPress={() => {
            id?.id && make(id.id);
          }}
        />
      </ScrollView>
    </View>
  );
}
