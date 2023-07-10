import { MaterialCommunityIcons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { formatDistance } from 'date-fns';
import { enUS, es, ptBR } from 'date-fns/locale';
import React, { useContext, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../contexts/auth';
import globalStyles from '../styles/globalStyles';
import postStyle from '../styles/postStyle';

import { MMKV } from 'react-native-mmkv';
const storage = new MMKV({ id: 'appFicoo' });

const avatar = '../assets/avatarM.jpg';

export default function CardPost({ data, userId }) {
  const { locale } = useContext(AuthContext);
  const [likePost, setLikePost] = useState(data?.like);
  const natigation = useNavigation();

  const getDataUser = storage.getString('user');
  const dataUser = JSON.parse(getDataUser);

  async function handleLikePost(id, like) {
    const docId = `${userId}_${id}`;

    //Checar se o post já foi curtido
    const doc = await firestore().collection('like').doc(docId).get();

    if (doc.exists) {
      //Que dizer que já curtiu esse post, entao precisamos remover o like
      await firestore()
        .collection('posts')
        .doc(id)
        .update({
          like: like - 1,
        });

      await firestore()
        .collection('like')
        .doc(docId)
        .delete()
        .then(() => {
          setLikePost(like - 1);
        });

      return;
    }

    // Precisamos dar o like no post
    await firestore().collection('like').doc(docId).set({
      postId: id,
      userId: userId,
    });

    await firestore()
      .collection('posts')
      .doc(id)
      .update({
        like: like + 1,
      })
      .then(() => {
        setLikePost(like + 1);
      });
  }

  function formatTimePost() {
    const datePost = new Date(data.createdAt.seconds * 1000);
    if (locale == 'pt') {
      return formatDistance(new Date(), datePost, {
        locale: ptBR,
      });
    }
    if (locale == 'en') {
      return formatDistance(new Date(), datePost, {
        locale: enUS,
      });
    }
    if (locale == 'es') {
      return formatDistance(new Date(), datePost, {
        locale: es,
      });
    }
  }
  return (
    <View style={postStyle.postContainer}>
      <TouchableOpacity
        onPress={() => {
          // natigation.navigate('userProfile');
          console.log('Id:', data);
        }}
        style={postStyle.header}>
        {data.avatarURL && (
          <Image
            style={globalStyles.postAvatar}
            source={{ uri: data.avatarURL }}
          />
        )}
        {!data.avatarURL && (
          <Image style={globalStyles.postAvatar} source={{ uri: avatar }} />
        )}
        <Text
          numberOfLines={1}
          style={globalStyles.txtDarkBoldLarge}
          multiline={false}>
          {data.autor}
        </Text>
      </TouchableOpacity>
      <View style={postStyle.content}>
        <Text
          numberOfLines={1}
          style={globalStyles.txtDarkBold}
          multiline={false}>
          {data.title}
        </Text>
        <Text numberOfLines={2} style={globalStyles.txtDark} multiline={false}>
          {data.post}
        </Text>
        <View style={postStyle.footer}>
          <View>
            <TouchableOpacity
              style={postStyle.likeButton}
              onPress={() => {
                dataUser.user?.uid
                  ? handleLikePost(data.id, likePost)
                  : console.log(null);
              }}>
              <Text style={globalStyles.txtDarkSmall}>
                {likePost === 0 ? '' : likePost}
              </Text>
              <MaterialCommunityIcons
                name={likePost === 0 ? 'heart-plus-outline' : 'cards-heart'}
                size={20}
                color="#E52246"
              />
            </TouchableOpacity>
          </View>

          <Text
            numberOfLines={1}
            style={globalStyles.txtDarkSmall}
            multiline={false}>
            {formatTimePost()}
          </Text>
        </View>
      </View>
    </View>
  );
}
