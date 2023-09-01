import firestore from '@react-native-firebase/firestore';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import BtnEdit from '../../../components/BtnEdit/intex';
import CardPost from '../../../components/Cardpost';
import Loading from '../../../components/Loading';
import { VARS } from '../../../constants/VARS';
import { AuthContext } from '../../../contexts/auth';
import styles from '../../../styles/styles';

export default function Posts() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRefresh, setLoadingRefresh] = useState(false);
  const [lastItem, setLastItem] = useState('');
  const [emptyList, setEmptyList] = useState(false);

  const { dataContext, locale } = useContext(AuthContext);
  let dic = require('../../../dic/lang.json');
  let lang = dic[locale];

  const updateChild = event => {
    fetchPosts();
  };

  function fetchPosts() {
    firestore()
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .limit(4)
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
        setEmptyList(!!snapshot.empty);
        setPosts(postList);
        setLastItem(snapshot.docs[snapshot.docs.length - 1]);
        setLoading(false);
      });
  }

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      fetchPosts();
      return () => {
        isActive = false;
      };
    }, []),
  );

  useEffect(() => {
    let isActive = true;
    fetchPosts();
    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    const options = navigation.setOptions({
      headerRight: () =>
        dataContext.storageData?.superAdm ? (
          <BtnEdit
            onPress={async () => {
              navigation.navigate('newPost');
            }}
            label={lang.new}
            labelColor={VARS.color.blue}
            color={VARS.color.whiteDark}
            icon="pencil"
            iconColor={VARS.color.blue}
            iconSize={VARS.size.icons * 0.8}
          />
        ) : null,
    });
  }, [dataContext]);

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

  return (
    <View style={[styles.container, { paddingHorizontal: 0 }]}>
      {loading && <Loading />}
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshing={loadingRefresh}
        onRefresh={() => {
          handleRefreshPosts();
        }}
        contentContainerStyle={{ paddingVertical: 15 }}
        style={{ flex: 1 }}
        data={posts}
        onEndReached={() => getListPosts()}
        onEndReachedThreshold={0.02}
        renderItem={({ item }) =>
          item.disable ? null : (
            <CardPost
              data={item}
              userId={dataContext.user?.uid}
              updateChild={updateChild}
            />
          )
        }
      />
    </View>
  );
}
