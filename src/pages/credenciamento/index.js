import { Ionicons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Btn from '../../components/Btn/intex';
import { VARS } from '../../constants/VARS';
import { AuthContext } from '../../contexts/auth';
import styles from '../../styles/styles';
import { legenda2 } from '../cursos/atividades';

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

export default function Credenciamento() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scan, setScan] = useState(false);
  const [id, setId] = useState();
  const [check, setCheck] = useState(false);
  const [current, setCurrent] = useState('none');
  const [atividades, setAtividades] = useState([]);
  const [inscritos, setInscritos] = useState([]);
  const [fullUsers, setFullUsers] = useState([]);
  const [showList, setShowList] = useState(false);
  const [presence, setPresence] = useState([]);

  const scanned = false;

  const { locale } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

  useEffect(() => {
    askForCameraPermission();
    getAtividades();
  }, []);

  const getAtividades = async () => {
    const list = [];
    await firestore()
      .collection('checkin')
      .get()
      .then(result => {
        result.forEach(doc => {
          list.push(doc.id);
        });
        return null;
      })
      .catch(err => {
        console.error('erro no banco:', err);
      });
    setAtividades(list);
    return list;
  };

  const getUsers = async chave => {
    const users = [];
    const fullUsers = [];
    const userName = [];
    const newPresence = [];
    await firestore()
      .collection('checkin')
      .doc(chave)
      .collection('users')
      .get()
      .then(result => {
        result.forEach(doc => {
          users.push(doc._data?.uid);
          fullUsers.push(doc._data);
          userName.push(doc._data.name);
        });
        setFullUsers(fullUsers);
        setInscritos(users);
        return;
      })
      .catch(err => {
        console.log(err);
      });
    await firestore()
      .collection('checkin')
      .doc(chave)
      .collection('presence')
      .get()
      .then(result => {
        result.forEach(doc => {
          newPresence.push(doc._data);
        });
        const listPresence = [];
        newPresence.map(value => {
          listPresence.push(value.uid);
        });
        setPresence(listPresence);
        return;
      })
      .catch(err => {
        console.log(err);
      });
    return;
  };

  const checkinUser = async info => {
    if (inscritos.indexOf(info.id) != -1) {
      await firestore()
        .collection('checkin')
        .doc(current)
        .collection('presence')
        .doc(info.id)
        .set({
          createdAt: new Date(),
          name: info.name,
          email: info.email,
          uid: info.id,
        })
        .then(() => {
          getUsers(current);
          setCheck(true);
          setShowList(false);
          setTimeout(() => {
            setCheck(false);
            setId();
          }, 2000);
        })
        .catch(err => {
          console.error('erro no banco:', err);
        });
      setId();
    }
    if (inscritos.indexOf(info.id) == -1) {
      setCheck('false');
      setTimeout(() => {
        setCheck(false);
        setId();
      }, 2000);
    }
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
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: 50,
          paddingTop: 10,
          gap: 20,
        }}
        style={{
          width: '100%',
          paddingHorizontal: 20,
          paddingVertical: 15,
        }}>
        <View style={{ flex: 1, gap: 6, width: '100%', paddingHorizontal: 10 }}>
          <Text
            style={{
              fontFamily: 'Abel',
              fontSize: 18,
              letterSpacing: 1,
              color: VARS.color.gray,
            }}>
            {lang.activity}
          </Text>
          <View
            style={{
              borderRadius: 15,
              borderWidth: 1,
              borderColor: VARS.color.blueLight,
              paddingHorizontal: 10,
              elevation: 5,
              backgroundColor: VARS.color.white,
              marginBottom: 10,
            }}>
            <Picker
              selectedValue={current}
              mode="dialog"
              dropdownIconColor={VARS.color.blue}
              onValueChange={(itemValue, itemIndex) => {
                if (itemValue != 'none') {
                  setCurrent(itemValue);
                  getUsers(itemValue);
                }
              }}>
              <Picker.Item
                label={lang.none}
                value="none"
                style={{
                  fontFamily: 'Abel',
                  letterSpacing: 1,
                  fontSize: 18,
                  color: VARS.color.blue,
                }}
              />
              {atividades.map((value, index) => {
                return (
                  <Picker.Item
                    key={index}
                    label={formatLetter(legenda2[value]?.slice(0, 35) + '...')}
                    value={value}
                    style={{
                      fontFamily: 'Abel',
                      letterSpacing: 1,
                      fontSize: 18,
                      color: VARS.color.blue,
                    }}
                  />
                );
              })}
            </Picker>
          </View>
        </View>
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
                {lang.scan}
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
          <Dados data={{ label: lang.labelName, value: id?.name }} />
          <Dados data={{ label: lang.labelEmail, value: id?.email }} />
          <Dados data={{ label: lang.identify, value: id?.id }} />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            padding: 8,
            backgroundColor: VARS.color.white,
            elevation: 5,
            paddingHorizontal: 20,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: VARS.color.grayLight,
          }}
          onPress={() => {
            setShowList(!showList);
          }}>
          <Text
            style={{ fontFamily: 'AbelBold', fontSize: 16, letterSpacing: 1 }}>
            {lang.inscritos}
          </Text>
        </TouchableOpacity>
        <Btn
          label={lang.validation}
          color={VARS.color.blue}
          icon="checkmark-circle-outline"
          iconColor={VARS.color.white}
          iconSize={VARS.size.icons * 0.8}
          onPress={() => {
            id?.id && checkinUser(id);
          }}
        />
      </ScrollView>
      {check && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'transparent',
            width: '100%',
            height: '100%',
            zIndex: 999,
            gap: 50,
          }}>
          <View
            style={{
              backgroundColor: VARS.color.white,
              flex: 1,
              margin: 40,
              marginVertical: 70,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: VARS.color.blueLight,
              elevation: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'AbelBold',
                letterSpacing: 1,
                fontSize: 30,
                textAlign: 'center',
                padding: 10,
              }}>
              {check == true ? lang.confirmUser : lang.noConfirmUser}
            </Text>
            {check == true ? (
              <Ionicons name="checkmark-outline" size={80} color={'green'} />
            ) : (
              <Ionicons name="close-outline" size={80} color={'red'} />
            )}
          </View>
        </View>
      )}
      {showList && current != 'none' && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'transparent',
            width: '100%',
            height: '100%',
            zIndex: 999,
            gap: 50,
          }}>
          <View
            style={{
              backgroundColor: VARS.color.white,
              flex: 1,
              margin: 20,
              marginVertical: 20,
              borderRadius: 30,
              borderWidth: 1,
              borderColor: VARS.color.blueLight,
              elevation: 10,
              padding: 20,
              paddingVertical: 20,
              alignItems: 'center',
              gap: 12,
            }}>
            <Text
              style={{
                width: '100%',
                textAlign: 'center',
                fontFamily: 'AbelBold',
                fontSize: 22,
                letterSpacing: 1,
                color: VARS.color.blue,
              }}>
              {formatLetter(legenda2[current]?.slice(0, 35) + '...')}
            </Text>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={{ width: '100%' }}
              contentContainerStyle={{
                gap: 8,
                paddingTop: 10,
              }}>
              {fullUsers.map((value, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 5,
                    }}>
                    {presence.includes(value.uid) && (
                      <Ionicons
                        name="checkmark-outline"
                        size={20}
                        color={'green'}
                      />
                    )}
                    {!presence.includes(value.uid) && (
                      <Ionicons name="help-outline" size={20} color={'green'} />
                    )}
                    <TouchableOpacity
                      activeOpacity={1}
                      onLongPress={() => {
                        Alert.alert(
                          'Atenção!',
                          'Você tem certeza que deseja validar presença?\n\nnome: ' +
                            value.name,
                          [
                            {
                              text: 'Cancel',
                              onPress: () => {},
                              style: 'cancel',
                            },
                            {
                              text: 'OK',
                              onPress: () => {
                                const newId = {};
                                newId['name'] = value.name;
                                newId['id'] = value.uid;
                                newId['email'] = value.email;
                                checkinUser(newId);
                              },
                            },
                          ],
                        );
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Abel',
                          fontSize: 20,
                          letterSpacing: 1,
                        }}>
                        {value.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                padding: 8,
                backgroundColor: VARS.color.white,
                elevation: 5,
                paddingHorizontal: 20,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: VARS.color.grayLight,
              }}
              onPress={() => {
                current != 'none' ? setShowList(!showList) : null;
              }}>
              <Text
                style={{
                  fontFamily: 'AbelBold',
                  fontSize: 16,
                  letterSpacing: 1,
                }}>
                {lang.close}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

function formatLetter(str) {
  const lowerCaseString = str.toLowerCase();
  return lowerCaseString.replace(/\b\w/g, l => l.toUpperCase());
}
