import firestore from '@react-native-firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import BtnEdit from '../../../components/BtnEdit/intex';
import ChatList from '../../../components/ChatList';
import InputTxt from '../../../components/InputTxt';
import Loading from '../../../components/Loading';
import ModalNewRoom from '../../../components/ModalNewRoom';
import { VARS } from '../../../constants/VARS';
import { AuthContext } from '../../../contexts/auth';
import styles from '../../../styles/styles';

export default function ChatRoom() {
  const [modalVisible, setModalVisible] = useState(false);
  const [threads, setThreads] = useState([]);
  const [list, setList] = useState([]);
  const [updateScreen, setUpdateScreen] = useState(false);
  const { dataContext, loading, setLoading } = useContext(AuthContext);
  const [input, setInput] = useState('');

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      function getChats() {
        firestore()
          .collection('messages')
          .orderBy('lastMessage.createdAt', 'desc')
          .limit(10)
          .get()
          .then(snapshot => {
            const threads = snapshot.docs.map(documentSnapshot => {
              return {
                _id: documentSnapshot.id,
                name: '',
                lastMessage: { text: '' },
                ...documentSnapshot.data(),
              };
            });
            if (isActive) {
              setThreads(threads);
              setList(threads);
              setLoading(false);
            }
          });
      }
      getChats();
      return () => {
        isActive = false;
      };
    }, []),
  );

  function deleteRoom(ownerId, idRoom) {
    if (
      ownerId == dataContext?.user?.uid ||
      dataContext.storageData?.isAdmin == true
    ) {
      Alert.alert(
        'Atenção!',
        'Você tem certeza que deseja deletar essa sala?',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => handleDeleteRoom(idRoom),
          },
        ],
      );
    } else return;
  }

  async function handleDeleteRoom(idRoom) {
    await firestore().collection('messages').doc(idRoom).delete();
    setUpdateScreen(!updateScreen);
  }

  async function handleSearch(txt) {
    setInput(txt);
    let newChats = [];
    setList(threads);
    if (txt == '') return;
    threads.forEach((v, i) => {
      if (v.name.toLowerCase().indexOf(txt.toLowerCase()) !== -1) {
        newChats.push(v);
      }
    });
    setList(newChats);
  }

  if (loading) {
    return <Loading />;
  }

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
        <View
          style={{
            width: '100%',
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
          }}>
          <Text
            style={{ fontFamily: 'AbelBold', letterSpacing: 1, fontSize: 22 }}>
            Bate Papo
          </Text>
          <BtnEdit
            label="Criar Grupo"
            color={VARS.color.whiteDark}
            icon=""
            labelColor={VARS.color.blue}
            iconColor={VARS.color.white}
            iconSize={VARS.size.icons * 0.8}
            onPress={() => {
              setModalVisible(true);
            }}
          />
        </View>
        <View style={[{ padding: 15 }]}>
          <InputTxt
            icon="search-outline"
            multiline={false}
            placeholder="Nome do grupo"
            security={false}
            editable={true}
            value={input}
            onChangeText={txt => {
              handleSearch(txt);
            }}
          />
        </View>
        <FlatList
          style={{
            width: '100%',
          }}
          data={list}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ChatList
              data={item}
              deleteRoom={() => deleteRoom(item.owner, item._id)}
              userStatus={dataContext.user}
            />
          )}
        />
        <Modal visible={modalVisible} animationType="fade" transparent={true}>
          <ModalNewRoom
            setVisible={() => setModalVisible(false)}
            setUpdateScreen={() => setUpdateScreen(!updateScreen)}
          />
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
