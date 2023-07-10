import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import * as imagePiker from 'expo-image-picker';
import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import { APP_VARS } from '../../constants/APP_VARS';
import { AuthContext } from '../../contexts/auth';
import handleSignOut from '../../functions/handleSignOut';
import setAuthContext from '../../functions/setAuthContext';
import componentStyles from '../../styles/componentStyles';
import dashboardStyles from '../../styles/dashboardStyles';
import globalStyles from '../../styles/globalStyles';

export default function Dashboard() {
  const { locale } = useContext(AuthContext);

  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

  const { dataContext, setLoading } = useContext(AuthContext);
  const [imageLoad, setImageLoad] = useState(false);

  const [photoAvatar, setPhotoAvatar] = useState(
    'https://firebasestorage.googleapis.com/v0/b/appficoo-ebbf0.appspot.com/o/avatarM.jpg?alt=media&token=a494693c-611f-435a-b34a-d54fcc38461d',
  );

  useEffect(() => {
    setLoading(false);
    dataContext.storageData.photoURL
      ? setPhotoAvatar(dataContext.storageData.photoURL)
      : setPhotoAvatar(
          'https://firebasestorage.googleapis.com/v0/b/appficoo-ebbf0.appspot.com/o/avatarM.jpg?alt=media&token=a494693c-611f-435a-b34a-d54fcc38461d',
        );
  }, []);

  const handleGetFile = async () => {
    const options = {
      noData: true,
      mediaType: 'photo',
      aspect: [1, 1],
    };
    const result = await imagePiker.launchImageLibraryAsync(options);
    if (!result.canceled) {
      uploadFirebase(result.assets[0].uri).then(() => {
        uploadAvatarPosts();
      });
    }
    if (result.canceled) {
      setImageLoad(false);
    }
  };

  const uploadFirebase = async response => {
    const storegaRef = storage().ref('users').child(dataContext.user?.uid);
    return await storegaRef.putFile(response);
  };

  const uploadAvatarPosts = async () => {
    const storageRef = storage().ref('users').child(dataContext.user?.uid);
    const url = await storageRef
      .getDownloadURL()
      .then(async image => {
        await firestore()
          .collection('user')
          .doc(dataContext.user?.uid)
          .update({
            photoURL: image,
          })
          .then(() => {})
          .catch(err => {
            console.error('erro no banco:', err);
          });
        const postDocs = await firestore()
          .collection('posts')
          .where('uid', '==', dataContext.user.uid)
          .get();
        postDocs.forEach(async doc => {
          await firestore().collection('posts').doc(doc.id).update({
            avatarURL: image,
          });
        });

        const newDataContext = dataContext;
        newDataContext.storageData.photoURL = image;
        setAuthContext(newDataContext);
        setPhotoAvatar(image);
        setImageLoad(false);
      })
      .catch(error => {
        console.log('ERROR AO ATUALIZAR FOTO DOS POSTS ', error);
        setImageLoad(false);
      });
  };

  return (
    <View
      style={[globalStyles.container, globalStyles.space, globalStyles.align]}>
      {imageLoad && (
        <ActivityIndicator
          size={APP_VARS.size.load}
          color={APP_VARS.color.activeIndicator}
        />
      )}
      {!imageLoad && (
        <TouchableOpacity
          onPress={() => {
            setImageLoad(true);
            handleGetFile();
          }}>
          <Image style={dashboardStyles.avatar} source={{ uri: photoAvatar }} />
        </TouchableOpacity>
      )}
      <Text style={globalStyles.txtDarkBold}>
        {dataContext.user.displayName}
      </Text>
      <View style={dashboardStyles.userData}>
        <Icon
          style={dashboardStyles.icon}
          name="email"
          color={APP_VARS.color.activeIcon}
          size={APP_VARS.size.icons}
        />
        <Text style={globalStyles.txtDark}>{dataContext.user.email}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          setLoading(true);
          handleSignOut();
        }}
        style={componentStyles.btnBlue}>
        <Text style={componentStyles.txtLight}>{lang.signout}</Text>
      </TouchableOpacity>
    </View>
  );
}
