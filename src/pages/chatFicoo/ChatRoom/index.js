import firestore from '@react-native-firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
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
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingRefresh, setLoadingRefresh] = useState(false);
  const [txt, setTxt] = useState();

  const { dataContext, locale, getActivationCode } = useContext(AuthContext);
  let dic = require('../../../dic/lang.json');
  let lang = dic[locale];

  useFocusEffect(
    useCallback(() => {
      getActivationCode();
      if (loadingRefresh) {
        setLoadingRefresh(false);
        return;
      }
      let isActive = true;
      function getChats() {
        firestore()
          .collection('messages')
          .orderBy('lastMessage.createdAt', 'desc')
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
            }
            setLoading(false);
          });
      }
      getChats();
      setLoadingRefresh(false);
      return () => {
        isActive = false;
      };
    }, [updateScreen, loadingRefresh]),
  );

  function deleteRoom(ownerId, idRoom) {
    if (
      ownerId == dataContext?.user?.uid ||
      dataContext.storageData?.superAdm == true
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

  // function handleActivateRoom(idRoom) {
  //   firestore()
  //     .collection('messages')
  //     .doc(idRoom)
  //     .get()
  //     .then(resp => {
  //       console.log(resp);
  //     });
  // }

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

  return (
    <View style={[styles.container, { paddingHorizontal: 0 }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={[
          styles.keyboardAvoidingView,
          {
            width: '100%',
            backgroundColor: 'transparent',
          },
        ]}>
        {loading && <Loading />}
        {/* <View style={{ flexDirection: 'row', gap: 20, paddingHorizontal: 20 }}>
          <TextInput
            onChangeText={data => {
              setTxt(data);
            }}
            value={txt}
            style={[
              {
                fontFamily: 'fontRegular',
                fontSize: 18,
                flex: 1,
                height: '100%',
                letterSpacing: 1,
                borderWidth: 1,
                borderColor: 'gray',
                height: 40,
              },
            ]}
          />
          <TouchableOpacity
            onPress={() => {
              handleActivateRoom(txt);
            }}
            style={{
              padding: 5,
              backgroundColor: 'gray',
              paddingHorizontal: 20,
            }}>
            <Text>Set</Text>
          </TouchableOpacity>
        </View> */}
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
            style={{
              fontSize: 20,
              color: 'black',
              fontWeight: '500',
            }}>
            {lang.batePapo}
          </Text>
          {dataContext.user?.uid && (
            <BtnEdit
              label={lang.newGroup}
              color={VARS.color.whiteDark}
              icon=""
              labelColor={VARS.color.blue}
              iconColor={VARS.color.white}
              iconSize={VARS.size.icons * 0.7}
              onPress={() => {
                setModalVisible(true);
              }}
            />
          )}
        </View>
        <View style={[{ padding: 15, paddingVertical: 10 }]}>
          <InputTxt
            icon="search-outline"
            multiline={false}
            placeholder={lang.groupName}
            security={false}
            editable={true}
            value={input}
            onChangeText={txt => {
              handleSearch(txt);
            }}
          />
        </View>
        <FlatList
          contentContainerStyle={{ paddingBottom: 20 }}
          style={{
            width: '100%',
          }}
          data={list}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          refreshing={loadingRefresh}
          onRefresh={() => {
            setLoadingRefresh(true);
          }}
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
    </View>
  );
}
