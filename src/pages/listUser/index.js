import { Ionicons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import GestureFlipView from 'react-native-gesture-flip-card';
import InputTxt from '../../components/InputTxt';
import { VARS } from '../../constants/VARS';
import styles from '../../styles/styles';

export default function ListUser() {
  const [lista, setLista] = useState([]);
  const [checkinList, setCheckinList] = useState([]);
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);

  const window = useWindowDimensions();

  const ficoo = {
    name: 'Ficoo',
    email: 'ficoo@email.com',
    city: 'Brasil',
    aboutme:
      'O FICOO é inspirado pela necessidade de reunir as diversas redes e organizações dedicadas ao desenvolvimento humano sustentável, pacífico e colaborativo.',
    checked: true,
  };

  useEffect(() => {
    getDocs();
    getCheckin();
  }, []);

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
          markers.push(doc.data());
        });
        return null;
      })
      .catch(err => {
        console.error('erro no banco:', err);
      });
    setLista(markers);
    setList(markers);
    return markers;
  };

  const getCheckin = async () => {
    const check = [];
    await firestore()
      .collection('checkin')
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
              fontFamily: 'Abel',
              fontSize: 18,
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
              fontFamily: 'Abel',
              fontSize: props.size ? props.size : 20,
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
            aspectRatio: 1.6,
            backgroundColor: ficoo ? '#eef' : VARS.color.white,
            borderWidth: 1,
            borderColor: VARS.color.blueLight,
            elevation: 10,
            padding: 10,
            borderRadius: 12,
            alignItems: 'center',
          }}>
          {checked && (
            <Ionicons
              style={{
                position: 'absolute',
                top: 10,
                right: 15,
              }}
              name="checkmark-outline"
              size={VARS.size.icons * 0.8}
              color={VARS.color.green}
            />
          )}
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: 15,
              paddingVertical: 8,
              paddingHorizontal: 8,
            }}>
            {item?.photoURL && (
              <Image
                style={{
                  borderRadius: VARS.size.avatar,
                  width: VARS.size.avatar / 1.8,
                  aspectRatio: 1,
                }}
                source={{ uri: item?.photoURL }}
              />
            )}
            <Text
              style={{
                fontFamily: 'AbelBold',
                fontSize: 24,
                letterSpacing: 1,
              }}>
              {item?.name}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              height: '100%',
              width: '100%',
              justifyContent: 'space-around',
              paddingHorizontal: 8,
            }}>
            <Label icon="mail-outline" label="" value={item?.email} />
            <Label icon="location-outline" label="" value={item?.city} />
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
                style={{ fontFamily: 'Abel', fontSize: 13, letterSpacing: 1 }}>
                Deslise para saber mais
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
            aspectRatio: 1.6,
            backgroundColor: ficoo ? '#eef' : VARS.color.white,
            borderWidth: 1,
            borderColor: VARS.color.blueLight,
            elevation: 10,
            padding: 18,
            borderRadius: 12,
            alignItems: 'center',
            gap: 6,
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text
              style={{
                width: '100%',
                fontFamily: 'AbelBold',
                fontSize: 22,
                letterSpacing: 1,
              }}>
              {item?.name}
            </Text>
          </View>

          <Text
            numberOfLines={7}
            ellipsizeMode="tail"
            style={{
              width: '100%',
              fontFamily: 'Abel',
              fontSize: 18,
              color: VARS.color.title,
              letterSpacing: 1,
              textAlign: 'justify',
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
          aspectRatio: 1.6,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <GestureFlipView width={window.width} height={window.width / 1.6}>
          <RenderFront />
          {item?.aboutme ? <RenderBack /> : <RenderFront />}
        </GestureFlipView>
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingHorizontal: 0 }]}>
      <View style={[{ padding: 15 }]}>
        <InputTxt
          icon="search-outline"
          multiline={false}
          placeholder="Nome do participante"
          security={false}
          editable={true}
          value={input}
          maxLength={20}
          onChangeText={txt => {
            handleSearch(txt);
          }}
        />
      </View>
      <ScrollView>
        <FlipCard index={1} item={ficoo} ficoo={true} />
        {list.map((value, index) => {
          return (
            !value.disableView && (
              <FlipCard
                key={index}
                index={index}
                item={value}
                checkin={checkinList}
              />
            )
          );
        })}
      </ScrollView>
    </View>
  );
}
