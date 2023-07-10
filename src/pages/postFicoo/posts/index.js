import { Feather } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import CardPost from '../../../components/CardPost';
import Loading from '../../../components/Loading';
import ModalNewRoom from '../../../components/ModalNewRoom';
import { APP_VARS } from '../../../constants/APP_VARS';
import { AuthContext } from '../../../contexts/auth';
import globalStyles from '../../../styles/globalStyles';

import { MMKV } from 'react-native-mmkv';
const storage = new MMKV({ id: 'appFicoo' });

export default function Posts() {
  const navigation = useNavigation();
  const { dataContext } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);

  const [loadingRefresh, setLoadingRefresh] = useState(false);
  const [lastItem, setLastItem] = useState('');
  const [emptyList, setEmptyList] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      function fetchPosts() {
        firestore()
          .collection('posts')
          .orderBy('createdAt', 'desc')
          .limit(4)
          .get()
          .then(snapshot => {
            if (isActive) {
              setPosts([]);
              const postList = [];
              snapshot.docs.map(u => {
                postList.push({
                  ...u.data(),
                  id: u.id,
                });
              });
              setEmptyList(!!snapshot.empty);
              setPosts(postList);
              setLastItem(snapshot.docs[snapshot.docs.length - 1]);
              setLoading(false);
            }
          });
      }
      fetchPosts();
      return () => {
        isActive = false;
      };
    }, []),
  );

  async function handleRefreshPosts() {
    setLoadingRefresh(true);

    firestore()
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .limit(8)
      .get()
      .then(snapshot => {
        setPosts([]);
        const postList = [];

        snapshot.docs.map(u => {
          postList.push({
            ...u.data(),
            id: u.id,
          });
        });

        setPosts(postList);
        setEmptyList(false);
        setLastItem(snapshot.docs[snapshot.docs.length - 1]);
        setLoading(false);
      });

    setLoadingRefresh(false);
  }

  async function getListPosts() {
    if (emptyList) {
      // se buscou toda sua lista tiramos o loading.
      setLoading(false);
      return null;
    }

    if (loading) return;

    firestore()
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .limit(8)
      .startAfter(lastItem)
      .get()
      .then(snapshot => {
        const postList = [];

        snapshot.docs.map(u => {
          postList.push({
            ...u.data(),
            id: u.id,
          });
        });
        setEmptyList(!!snapshot.empty);
        setLastItem(snapshot.docs[snapshot.docs.length - 1]);
        setPosts(oldPosts => [...oldPosts, ...postList]);
        setLoading(false);
      });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <View
      style={[globalStyles.container, globalStyles.space, globalStyles.center]}>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshing={loadingRefresh}
        onRefresh={handleRefreshPosts}
        style={globalStyles.flatList}
        data={posts}
        onEndReached={() => getListPosts()}
        onEndReachedThreshold={0.02}
        renderItem={({ item }) => (
          <CardPost data={item} userId={dataContext.user?.uid} />
        )}
      />

      {dataContext.storageData?.isAdmin && (
        <TouchableOpacity
          style={globalStyles.flatButton}
          onPress={() => {
            dataContext.user?.uid
              ? navigation.navigate('newPost')
              : navigation.navigate('Perfil');
          }}>
          <Feather
            name="edit-3"
            size={APP_VARS.size.icons * 0.8}
            color={APP_VARS.color.activeIcon}
            style={globalStyles.iconCenter}
          />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={
          () => storage.set('active', 'passActivate')
          // setModalVisible(true)
        }>
        <Text>Teste</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <ModalNewRoom
          setVisible={() => setModalVisible(false)}
          setUpdateScreen={() => setUpdateScreen(!updateScreen)}
        />
      </Modal>
    </View>
  );
}
