import { Ionicons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
import { Buffer } from 'buffer';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import GestureFlipView from 'react-native-gesture-flip-card';
import InputTxt from '../../components/InputTxt';
import Loading from '../../components/Loading';
import { VARS } from '../../constants/VARS';
import { AuthContext } from '../../contexts/auth';
import styles from '../../styles/styles';

function fromBase64(encoded) {
  return Buffer.from(encoded, 'base64').toString('utf8');
}

export default function ListUser() {
  const [lista, setLista] = useState([]);
  const [checkinList, setCheckinList] = useState([]);
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const onRefresh = useCallback(() => {
    setLoading(true);
    getDocs();
    getCheckin();
  }, []);

  const [avatarFicoo, setAvatarFicoo] = useState(
    'https://firebasestorage.googleapis.com/v0/b/appficoo-ebbf0.appspot.com/o/logo-white.png?alt=media&token=1d972f3e-339f-4c37-bafe-9431051de805',
  );

  const { locale, dataContext } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

  const window = useWindowDimensions();

  useEffect(() => {
    getDocs();
    getCheckin();
  }, []);

  const handleReset = async user => {
    await firestore()
      .collection('checkin')
      .doc(user.oficina1)
      .collection('users')
      .doc(user.uid)
      .delete()
      .then(() => {})
      .catch(err => {
        console.error('erro no banco:', err);
      });
    await firestore()
      .collection('checkin')
      .doc(user.oficina1)
      .collection('presence')
      .doc(user.uid)
      .delete()
      .then(() => {})
      .catch(err => {
        console.error('erro no banco:', err);
      });
    await firestore()
      .collection('checkin')
      .doc(user.oficina2)
      .collection('users')
      .doc(user.uid)
      .delete()
      .then(() => {})
      .catch(err => {
        console.error('erro no banco:', err);
      });
    await firestore()
      .collection('checkin')
      .doc(user.oficina2)
      .collection('presence')
      .doc(user.uid)
      .delete()
      .then(() => {})
      .catch(err => {
        console.error('erro no banco:', err);
      });
    const reset = user;
    // delete reset.isAdmin;
    delete reset.oficina1;
    delete reset.oficina2;
    delete reset.inscrito;
    await firestore()
      .collection('user')
      .doc(user.uid)
      .set(reset)
      .then(() => {})
      .catch(err => {
        console.error('erro no banco:', err);
      });
    getDocs();
    getCheckin();
  };

  const handleCheckin = async info => {
    await firestore()
      .collection('checkin')
      .doc('evento')
      .collection('users')
      .doc(info.uid)
      .set({
        createdAt: new Date(),
        name: info.name,
        email: info.email,
        uid: info.uid,
        manual: true,
      })
      .then(() => {
        getCheckin();
      })
      .catch(err => {
        console.error('erro no banco:', err);
      });
  };

  async function handleSearch(txt) {
    setInput(txt);
    let busca = [];
    setList(lista);
    if (txt == '') return;
    lista.forEach((v, i) => {
      if (v.name.toLowerCase().indexOf(txt.toLowerCase()) !== -1) {
        busca.push(v);
      }
    });
    busca?.sort();
    setList(busca);
  }

  const getDocs = async () => {
    const markers = [];
    await firestore()
      .collection('user')
      .get()
      .then(result => {
        result.forEach(doc => {
          doc.data().uid = doc.id;
          doc.data().ficoo
            ? markers.unshift(doc.data())
            : markers.push(doc.data());
        });
        return null;
      })
      .catch(err => {
        console.error('erro no banco:', err);
      });
    markers.sort((a, b) => {
      if (b.ficoo) return 1;
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
    setLista(markers);
    setList(markers);
    setLoading(false);
    return markers;
  };

  const getCheckin = async () => {
    const check = [];
    await firestore()
      .collection('checkin')
      .doc('evento')
      .collection('users')
      .get()
      .then(result => {
        result.forEach(doc => {
          doc.data().uid = doc.id;
          check.push(doc.data());
        });
        return null;
      })
      .catch(err => {
        console.error('erro no banco:', err);
      });
    setCheckinList(check);
    return check;
  };

  const Label = props => {
    return (
      <View style={{ justifyContent: 'center', gap: 8 }}>
        {props.label && (
          <Text
            style={{
              fontFamily: 'fontRegular',
              fontSize: 16,
              color: VARS.color.title,
              letterSpacing: 1,
            }}>
            {props.label}
          </Text>
        )}
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          {props.icon && (
            <Ionicons
              name={props?.icon}
              size={VARS.size.icons * 0.6}
              color={VARS.color.title}
            />
          )}
          <Text
            numberOfLines={8}
            ellipsizeMode="tail"
            style={{
              flex: 1,
              fontFamily: 'fontRegular',
              fontSize: props.size ? props.size : 16,
              color: VARS.color.title,
              letterSpacing: 1,
              textAlign: 'justify',
            }}>
            {props.value}
          </Text>
        </View>
      </View>
    );
  };

  const FlipCard = ({ item, checkin, ficoo }) => {
    let checked = false;
    checkin?.forEach((v, i) => {
      if (item?.uid == v.uid) {
        checked = true;
      }
    });
    ficoo ? (checked = true) : null;
    function RenderFront() {
      return (
        <View
          style={{
            width: window.width - 40,
            aspectRatio: 1.0,
            backgroundColor: ficoo ? '#eef' : VARS.color.white,
            borderWidth: 1,
            borderColor: VARS.color.blueLight,
            elevation: 10,
            padding: 10,
            borderRadius: 12,
            alignItems: 'center',
            gap: 4,
          }}>
          {checked && item.inscrito && (
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 10,
                right: 15,
              }}
              activeOpacity={1}
              onLongPress={() => {
                dataContext.storageData?.superAdm &&
                  Alert.alert(
                    'Atenção!',
                    'Tem certeza que deseja fazer o reset do usuário?',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => {},
                        style: 'cancel',
                      },
                      {
                        text: 'OK',
                        onPress: () => {
                          handleReset(item);
                        },
                      },
                    ],
                  );
              }}>
              <Ionicons
                name="checkmark-done-outline"
                size={VARS.size.icons * 0.8}
                color={VARS.color.green}
              />
            </TouchableOpacity>
          )}
          {checked && !item.inscrito && (
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 10,
                right: 15,
              }}
              activeOpacity={1}
              onLongPress={() => {
                dataContext.storageData?.superAdm &&
                  Alert.alert(
                    'Atenção!',
                    'Tem certeza que deseja fazer o reset do usuário?',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => {},
                        style: 'cancel',
                      },
                      {
                        text: 'OK',
                        onPress: () => {
                          handleReset(item);
                        },
                      },
                    ],
                  );
              }}>
              <Ionicons
                name="checkmark-outline"
                size={VARS.size.icons * 0.8}
                color={VARS.color.green}
              />
            </TouchableOpacity>
          )}
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: 15,
              padding: 6,
            }}>
            {item?.photoURL && (
              <TouchableOpacity
                activeOpacity={1}
                onLongPress={() => {
                  dataContext.storageData?.isAdmin &&
                    Alert.alert(
                      'Atenção!',
                      'Tem certeza que deseja fazer o checkin do usuário?',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => {},
                          style: 'cancel',
                        },
                        {
                          text: 'OK',
                          onPress: () => {
                            handleCheckin(item);
                          },
                        },
                      ],
                    );
                }}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 50,
                  elevation: 10,
                }}>
                <Image
                  style={{
                    borderRadius: VARS.size.avatar,
                    width: VARS.size.avatar / 1.75,
                    aspectRatio: 1,
                  }}
                  source={{ uri: item?.photoURL }}
                />
              </TouchableOpacity>
            )}
            <Text
              style={{
                flex: 1,
                fontFamily: 'fontBold',
                fontSize: 20,
                letterSpacing: 1,
                color: 'black',
              }}>
              {item?.name}
            </Text>
            {/* <Text>{fromBase64(item.pwd)}</Text> */}
          </View>
          <View
            style={{
              flex: 1,
              height: '100%',
              width: '100%',
              justifyContent: 'space-around',
              paddingHorizontal: 6,
              gap: 6,
            }}>
            <Label icon="mail-outline" label="" value={item?.email} />
            {item.instagram ? (
              <Label icon="logo-instagram" label="" value={item?.instagram} />
            ) : null}
            {item.linkedin ? (
              <Label icon="logo-linkedin" label="" value={item?.linkedin} />
            ) : null}
            {item.city ? (
              <Label icon="location-outline" label="" value={item?.city} />
            ) : null}
            <View />
          </View>
          {ficoo && (
            <View
              style={{
                position: 'absolute',
                flexDirection: 'row',
                bottom: 10,
                right: 15,
                gap: 10,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'fontBold',
                  fontSize: 14,
                  letterSpacing: 1,
                  color: VARS.color.orange,
                }}>
                {lang.slideMore}
              </Text>
              <Ionicons
                name="arrow-redo-outline"
                size={VARS.size.icons * 0.8}
                color={VARS.color.orange}
              />
            </View>
          )}
        </View>
      );
    }

    function RenderBack() {
      return (
        <View
          style={{
            width: window.width - 40,
            aspectRatio: 1.0,
            backgroundColor: ficoo ? '#eef' : VARS.color.white,
            borderWidth: 1,
            borderColor: VARS.color.blueLight,
            elevation: 10,
            padding: 18,
            borderRadius: 12,
            alignItems: 'center',
            gap: 12,
          }}>
          <Text
            style={{
              width: '100%',
              fontFamily: 'fontBold',
              fontSize: 20,
              letterSpacing: 1,
              color: 'black',
            }}>
            {item?.name}
          </Text>
          <Text
            numberOfLines={10}
            ellipsizeMode="tail"
            style={{
              width: '100%',
              fontFamily: 'fontRegular',
              fontSize: 18,
              color: VARS.color.title,
              letterSpacing: 1,
              textAlign: 'justify',
              lineHeight: 28,
            }}>
            {item?.aboutme}
          </Text>
        </View>
      );
    }
    return (
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <GestureFlipView width={window.width} height={window.width / 1.06}>
          <RenderFront />
          {item?.aboutme ? <RenderBack /> : <RenderFront />}
        </GestureFlipView>
      </View>
    );
  };
  return (
    <View style={[styles.container, { paddingHorizontal: 0 }]}>
      {loading && <Loading />}
      <View style={[{ paddingHorizontal: 20, padding: 8 }]}>
        <InputTxt
          icon="search-outline"
          multiline={false}
          placeholder={lang.listNameUser}
          security={false}
          editable={true}
          value={input}
          maxLength={20}
          onChangeText={txt => {
            handleSearch(txt);
          }}
        />
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 25 }}>
        {list.map((value, index) => {
          return (
            !value.disableView && (
              <FlipCard
                key={index}
                index={index}
                item={value}
                ficoo={value.ficoo}
                checkin={checkinList}
              />
            )
          );
        })}
      </ScrollView>
    </View>
  );
}
