import { Ionicons } from '@expo/vector-icons';
import { deleteUser, getAuth } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useNavigation } from '@react-navigation/native';
import * as imagePiker from 'expo-image-picker';
import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import Btn from '../../components/Btn/intex';
import BtnEdit from '../../components/BtnEdit/intex';
import EditInputText from '../../components/EditInputText';
import Language from '../../components/Language';
import Loading from '../../components/Loading';
import { VARS } from '../../constants/VARS';
import { AuthContext } from '../../contexts/auth';
import setAuthContext from '../../functions/setAuthContext';
import setUpdateUserFirebase from '../../functions/setUpdateUserFirebase';
import styles from '../../styles/styles';

const auth = getAuth();
const user = auth.currentUser;

export default function EditProfile() {
  const navigation = useNavigation();

  const { locale } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

  const { dataContext } = useContext(AuthContext);
  const [imageLoad, setImageLoad] = useState(false);
  const [name, setName] = useState(dataContext.storageData?.name);
  const [email, setEmail] = useState(dataContext.user.email);
  const [phone, setPhone] = useState(dataContext.storageData?.phone);
  const [city, setCity] = useState(dataContext.storageData?.city);
  const [aboutme, setAboutme] = useState(dataContext.storageData?.aboutme);
  const [loading, setLoading] = useState(true);
  const [instagram, setInstagram] = useState(
    dataContext.storageData?.instagram,
  );
  const [linkedin, setLinkedin] = useState(dataContext.storageData?.linkedin);
  const [photoAvatar, setPhotoAvatar] = useState(
    'https://firebasestorage.googleapis.com/v0/b/appficoo-ebbf0.appspot.com/o/avatarM.jpg?alt=media&token=a494693c-611f-435a-b34a-d54fcc38461d',
  );

  useEffect(() => {
    dataContext.storageData.photoURL
      ? setPhotoAvatar(dataContext.storageData.photoURL)
      : setPhotoAvatar(
          'https://firebasestorage.googleapis.com/v0/b/appficoo-ebbf0.appspot.com/o/avatarM.jpg?alt=media&token=a494693c-611f-435a-b34a-d54fcc38461d',
        );
    setLoading(false);
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
          .where('uid', '==', dataContext.user?.uid)
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

  const handleSetDisableUser = async () => {
    await firestore()
      .collection('user')
      .doc(dataContext.user.uid)
      .update({
        disableAt: new Date(),
        disableView: true,
      })
      .then(() => {
        handleUserDelete();
      })
      .catch(err => {
        console.error('erro no banco:', err);
      });
  };

  const handleUserDelete = () => {
    setLoading(true);
    if (user != null) {
      deleteUser(user)
        .then(() => {
          setAuthContext('');
          setLoading(false);
        })
        .catch(error => {
          console.log('erro:', error);
          setLoading(false);
        });
    } else {
      setAuthContext('');
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 180 : 0}
      style={[
        styles.keyboardAvoidingView,
        {
          backgroundColor: VARS.color.white,
        },
      ]}>
      {loading && <Loading />}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        <View
          style={[
            styles.container,
            { gap: 8, justifyContent: 'flex-start', paddingBottom: 20 },
          ]}>
          <View
            style={{
              alignItems: 'center',
              width: '100%',
              marginTop: 20,
              borderRadius: 100,
            }}>
            {imageLoad && (
              <ActivityIndicator
                style={{ marginBottom: 10 }}
                size={VARS.size.load}
                color={VARS.color.blue}
              />
            )}
            {!imageLoad && (
              <TouchableOpacity
                style={{
                  shadowColor: 'black',
                  width: VARS.size.avatar,
                  height: VARS.size.avatar,
                  borderRadius: VARS.size.avatar / 2,
                  elevation: 15,
                  padding: 0,
                }}
                onPress={() => {
                  setImageLoad(true);
                  handleGetFile();
                }}>
                <Image
                  style={{
                    borderRadius: VARS.size.avatar,
                    width: '100%',
                    height: '100%',
                  }}
                  source={{ uri: photoAvatar }}
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: VARS.color.blue,
                    padding: 8,
                    borderRadius: 100,
                    zIndex: 99,
                    borderWidth: 3,
                    borderColor: VARS.color.whiteOpacity,
                  }}>
                  <Ionicons
                    style={{ borderRadius: 100 }}
                    name="camera-outline"
                    size={VARS.size.icons * 0.7}
                    color={VARS.color.white}
                  />
                </View>
              </TouchableOpacity>
            )}
          </View>
          <View style={{ alignItems: 'flex-start', gap: 5, width: '100%' }}>
            <EditInputText
              label={lang.labelName}
              placeholder=""
              value={name}
              editable={true}
              security={false}
              onChangeText={txt => {
                setName(txt);
              }}
            />
            <EditInputText
              label={lang.labelEmail}
              placeholder=""
              value={email}
              security={false}
              editable={false}
            />
            <EditInputText
              label="instagram"
              placeholder=""
              value={instagram}
              icon="logo-instagram"
              security={false}
              editable={true}
              onChangeText={txt => {
                setInstagram(txt.toLowerCase());
              }}
            />
            <EditInputText
              label="linkedIn"
              placeholder=""
              value={linkedin}
              icon="logo-linkedin"
              security={false}
              editable={true}
              onChangeText={txt => {
                setLinkedin(txt.toLowerCase());
              }}
            />
            <EditInputText
              label={lang.labelPhone}
              placeholder=""
              value={phone}
              security={false}
              keyboardType="phone-pad"
              maxLength={18}
              editable={true}
              onChangeText={txt => {
                setPhone(txt);
                // setPhone(formatPhoneNumber(txt));
              }}
            />
            <EditInputText
              label={lang.labelCity}
              placeholder=""
              value={city}
              security={false}
              editable={true}
              onChangeText={txt => {
                setCity(txt);
              }}
            />
            <EditInputText
              label={lang.labelAboutme}
              placeholder=""
              value={aboutme}
              security={false}
              multiline={true}
              maxLength={250}
              textAlignVertical="top"
              editable={true}
              onChangeText={txt => {
                setAboutme(txt);
              }}
            />
          </View>
          <Language />
        </View>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 30,
          }}>
          <BtnEdit
            label={lang.removeUser}
            color={VARS.color.white}
            icon="close-circle-outline"
            iconColor={VARS.color.orange}
            iconSize={VARS.size.icons}
            colorLabel={VARS.color.orange}
            onPress={() => {
              Alert.alert(
                'Atenção!',
                'Você deseja apagar esta conta permanentemente?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => handleSetDisableUser(),
                  },
                ],
              );
            }}
          />
        </View>
      </ScrollView>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Btn
          label={lang.save}
          color={VARS.color.blue}
          icon="checkmark-circle-outline"
          iconColor={VARS.color.white}
          iconSize={VARS.size.icons}
          onPress={async () => {
            const data = {};
            name ? (data.name = name) : null;
            phone ? (data.phone = phone) : null;
            city ? (data.city = city) : null;
            instagram ? (data.instagram = instagram) : null;
            linkedin ? (data.linkedin = linkedin) : null;
            aboutme ? (data.aboutme = aboutme) : null;
            setLoading(true);
            await setUpdateUserFirebase({
              dataContext: dataContext,
              data: data,
            });
            setLoading(false);
            navigation.goBack();
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
