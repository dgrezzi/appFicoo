import React, { useContext, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { VARS } from '../../constants/VARS';
import { AuthContext } from '../../contexts/auth';
import Btn from '../Btn/intex';
import InputTxt from '../InputTxt';

function ModalNewRoom({ setVisible, setUpdateScreen }) {
  const { locale } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

  const [roomName, setRoomName] = useState('');
  const user = auth().currentUser.toJSON();

  function handleButtonCreate() {
    if (roomName === '') return;
    firestore()
      .collection('messages')
      .get()
      .then(snapshot => {
        let myThreads = 0;

        snapshot.docs.map(docItem => {
          if (docItem.data().owner === user.uid) {
            myThreads += 1;
          }
        });

        if (myThreads >= 99) {
          alert('Você já atingiu o limite de grupos por usuario.');
        } else {
          createRoom();
        }
      });
  }

  function createRoom() {
    firestore()
      .collection('messages')
      .add({
        name: roomName,
        owner: user.uid,
        lastMessage: {
          text: `Tema ${roomName} criado. Bem vindo(a)!`,
          createdAt: firestore.FieldValue.serverTimestamp(),
        },
      })
      .then(docRef => {
        docRef
          .collection('MESSAGES')
          .add({
            text: `Tema ${roomName} criado. Bem vindo(a)!`,
            createdAt: firestore.FieldValue.serverTimestamp(),
            system: true,
            user: {
              displayName: 'FICOO',
            },
          })
          .then(() => {
            setVisible();
            setUpdateScreen();
          });
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <View style={{ flex: 1, backgroundColor: VARS.color.whiteOpacity }}>
      <TouchableWithoutFeedback onPress={setVisible}>
        <View style={{ flex: 1 }}></View>
      </TouchableWithoutFeedback>

      <View
        style={{
          backgroundColor: VARS.color.white,
          padding: 20,
          justifyContent: 'space-around',
          gap: 12,
          alignItems: 'center',
        }}>
        <Text
          style={{ fontFamily: 'fontBold', fontSize: 22, letterSpacing: 1 }}>
          {lang.modalTitle}
        </Text>

        <InputTxt
          icon=""
          multiline={false}
          placeholder={lang.modalLabel}
          security={false}
          editable={true}
          value={roomName}
          maxLength={25}
          onChangeText={txt => {
            setRoomName(txt);
          }}
        />
        <Btn
          label={lang.modalButton}
          color={VARS.color.blue}
          icon=""
          iconSize={20}
          iconColor={VARS.color.white}
          onPress={() => {
            handleButtonCreate();
          }}
        />

        <TouchableOpacity
          style={{
            backgroundColor: VARS.color.white,
            height: 52,
            paddingHorizontal: 35,
            marginBottom: 12,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
            shadowColor: VARS.color.blue,
            borderColor: VARS.color.blueLight,
          }}
          onPress={setVisible}>
          <Text
            style={{
              width: '100%',
              fontFamily: 'fontRegular',
              fontSize: 18,
              letterSpacing: 1,
            }}>
            {lang.back}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ModalNewRoom;
