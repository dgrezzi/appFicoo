import firestore from '@react-native-firebase/firestore';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ChatList from '../../../components/ChatList';
import FabButton from '../../../components/FabButton';
import Loading from '../../../components/Loading';
import ModalNewRoom from '../../../components/ModalNewRoom';
import { APP_VARS } from '../../../constants/APP_VARS';
import { AuthContext } from '../../../contexts/auth';
import chatStyles from '../../../styles/chatStyles';
import globalStyles from '../../../styles/globalStyles';

export default function ChatRoom() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [threads, setThreads] = useState([]);
  const [updateScreen, setUpdateScreen] = useState(false);
  const { dataContext, loading, setLoading } = useContext(AuthContext);

  useEffect(() => {
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
            setLoading(false);
          }
        });
    }
    getChats();
    return () => {
      isActive = false;
    };
  }, [isFocused, updateScreen]);

  function deleteRoom(ownerId, idRoom) {
    // Se o cara que está tentando deletar nao é dono dessa sala.
    if (
      ownerId == dataContext?.user?.uid ||
      dataContext.storageData.isAdmin == true
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

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={[globalStyles.container, globalStyles.center]}>
      <View style={chatStyles.headerRoom}>
        <Text style={globalStyles.txtLightBoldXLarge}>Chat Ficoo</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <MaterialIcons
            name="search"
            size={APP_VARS.size.icons}
            color="#FFF"
          />
        </TouchableOpacity>
      </View>
      <FlatList
        style={globalStyles.flatList}
        data={threads}
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
      {dataContext.storageData?.isAdmin && (
        <FabButton
          setVisible={() => setModalVisible(true)}
          userStatus={dataContext.user}
        />
      )}

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <ModalNewRoom
          setVisible={() => setModalVisible(false)}
          setUpdateScreen={() => setUpdateScreen(!updateScreen)}
        />
      </Modal>
    </SafeAreaView>
  );
}
