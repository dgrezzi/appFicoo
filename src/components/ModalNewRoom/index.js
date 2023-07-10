import React, { useContext, useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../contexts/auth';
import globalStyles from '../../styles/globalStyles';
import modalNewRoomStyles from '../../styles/modalNewRoomStyles';

function ModalNewRoom({ setVisible, setUpdateScreen }) {
  const { locale } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

  const [roomName, setRoomName] = useState('');
  const user = auth().currentUser.toJSON();

  function handleButtonCreate() {
    if (roomName === '') return;

    //Deixar apenas cada usuario criar 4 grupos!.
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

  // Criar nova sala no firestore (banco do firebase)
  function createRoom() {
    firestore()
      .collection('messages')
      .add({
        name: roomName,
        owner: user.uid,
        lastMessage: {
          text: `Grupo ${roomName} criado. Bem vindo(a)!`,
          createdAt: firestore.FieldValue.serverTimestamp(),
        },
      })
      .then(docRef => {
        docRef
          .collection('MESSAGES')
          .add({
            text: `Grupo ${roomName} criado. Bem vindo(a)!`,
            createdAt: firestore.FieldValue.serverTimestamp(),
            system: true,
            user: {
              displayName: 'System',
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
    <View style={modalNewRoomStyles.container}>
      <TouchableWithoutFeedback onPress={setVisible}>
        <View style={modalNewRoomStyles.modal}></View>
      </TouchableWithoutFeedback>

      <View style={[modalNewRoomStyles.modalContent, globalStyles.gap]}>
        <Text style={modalNewRoomStyles.title}>{lang.createGroupAsk}</Text>
        <TextInput
          value={roomName}
          onChangeText={text => setRoomName(text)}
          placeholder={lang.nameGroupAsk}
          style={globalStyles.input}
        />

        <TouchableOpacity
          style={modalNewRoomStyles.buttonCreate}
          onPress={handleButtonCreate}>
          <Text style={globalStyles.txtLight}>{lang.createRoom}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={modalNewRoomStyles.backButton}
          onPress={setVisible}>
          <Text style={globalStyles.txtDarkSmall}>{lang.back}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ModalNewRoom;
