import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MMKV } from 'react-native-mmkv';
import Btn from '../../components/Btn/intex';
import BtnEdit from '../../components/BtnEdit/intex';
import Loading from '../../components/Loading';
import { VARS } from '../../constants/VARS';
import { AuthContext } from '../../contexts/auth';
import getDataUserFirebase from '../../functions/getDataUserFirebase';
import handleSignOut from '../../functions/handleSignOut';
import styles from '../../styles/styles';

const storage = new MMKV({ id: 'appFicoo' });

export default function Profile() {
  const navigation = useNavigation();
  const { dataContext } = useContext(AuthContext);
  const [imageLoad, setImageLoad] = useState(true);
  const [loading, setLoading] = useState(true);

  const { locale, getActivationCode } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

  const [photoAvatar, setPhotoAvatar] = useState(
    'https://firebasestorage.googleapis.com/v0/b/appficoo-ebbf0.appspot.com/o/avatarM.jpg?alt=media&token=a494693c-611f-435a-b34a-d54fcc38461d',
  );

  useEffect(() => {
    dataContext.storageData?.photoURL
      ? setPhotoAvatar(dataContext.storageData.photoURL)
      : setPhotoAvatar(
          'https://firebasestorage.googleapis.com/v0/b/appficoo-ebbf0.appspot.com/o/avatarM.jpg?alt=media&token=a494693c-611f-435a-b34a-d54fcc38461d',
        );
    setImageLoad(false);
    setLoading(false);
  }, [dataContext]);

  useFocusEffect(
    useCallback(() => {
      getActivationCode();
      getDataUserFirebase(dataContext);
      setLoading(false);
    }, []),
  );

  return (
    <View style={[styles.container, { paddingTop: 0, paddingHorizontal: 0 }]}>
      {loading && <Loading />}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          paddingHorizontal: 20,
          padding: 10,
        }}>
        <BtnEdit
          onPress={async () => {
            navigation.navigate('Cursos');
          }}
          label={lang.perfilInsc}
          labelColor={VARS.color.white}
          color={VARS.color.orange}
          icon="alert-outline"
          iconColor={VARS.color.white}
          fontFamily="fontBold"
          iconSize={VARS.size.icons * 0.8}
        />
        <BtnEdit
          onPress={() => {
            navigation.navigate('EditProfile');
          }}
          label={lang.edit}
          labelColor={VARS.color.blue}
          color={VARS.color.whiteDark}
          icon="pencil"
          iconColor={VARS.color.blue}
          iconSize={VARS.size.icons * 0.8}
        />
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          {
            backgroundColor: VARS.color.white,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 35,
            paddingRight: 12,
            paddingVertical: 25,
            paddingHorizontal: 20,
          },
        ]}>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            gap: 20,
            marginVertical: 10,
          }}>
          {imageLoad && (
            <ActivityIndicator
              style={{ marginBottom: 10 }}
              size={VARS.size.load}
              color={VARS.color.blue}
            />
          )}
          {!imageLoad && (
            <View
              style={{
                evation: 10,
                shadowColor: 'black',
                width: VARS.size.avatar,
                height: VARS.size.avatar,
                borderRadius: VARS.size.avatar / 2,
                elevation: 15,
              }}>
              <TouchableOpacity
                style={{ borderRadius: 100, width: '100%', aspectRatio: 1 }}
                onLongPress={() => {
                  Alert.alert('Atenção!', 'Resetar o aplicativo?', [
                    {
                      text: 'Cancel',
                      onPress: () => {},
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: () => storage.clearAll(),
                    },
                  ]);
                }}
                activeOpacity={1}>
                <Image
                  style={{
                    borderRadius: VARS.size.avatar,
                    marginBottom: 10,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'white',
                  }}
                  source={{ uri: photoAvatar }}
                />
              </TouchableOpacity>
            </View>
          )}
          <View style={{ alignItems: 'center', gap: 10 }}>
            <Text
              style={{
                fontFamily: 'fontBold',
                fontSize: 20,
                letterSpacing: 1,
                color: VARS.color.title,
              }}>
              {dataContext.storageData?.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                gap: 5,
                paddingHorizontal: 10,
              }}>
              <Ionicons name="mail-outline" size={20} color="red" />
              <Text
                style={{
                  fontFamily: 'fontRegular',
                  fontSize: 18,
                  letterSpacing: 1,
                  color: VARS.color.title,
                }}>
                {dataContext.user?.email}
              </Text>
            </View>
            {dataContext.storageData?.phone ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  gap: 5,
                  paddingHorizontal: 10,
                }}>
                <Ionicons name="call-outline" size={20} color="red" />
                <Text
                  style={{
                    fontFamily: 'fontRegular',
                    fontSize: 18,
                    letterSpacing: 1,
                    color: VARS.color.title,
                  }}>
                  {dataContext.storageData?.phone}
                </Text>
              </View>
            ) : null}
            {dataContext.storageData?.instagram ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  gap: 5,
                  paddingHorizontal: 10,
                }}>
                <Ionicons name="logo-instagram" size={20} color="red" />
                <Text
                  style={{
                    fontFamily: 'fontRegular',
                    fontSize: 18,
                    letterSpacing: 1,
                    color: VARS.color.title,
                  }}>
                  {dataContext.storageData?.instagram}
                </Text>
              </View>
            ) : null}
            {dataContext.storageData?.linkedin ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  gap: 5,
                  paddingHorizontal: 10,
                }}>
                <Ionicons name="logo-linkedin" size={20} color="red" />
                <Text
                  style={{
                    fontFamily: 'fontRegular',
                    fontSize: 18,
                    letterSpacing: 1,
                    color: VARS.color.title,
                  }}>
                  {dataContext.storageData?.linkedin}
                </Text>
              </View>
            ) : null}
            {dataContext.storageData?.city ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  gap: 5,
                  paddingHorizontal: 10,
                }}>
                <Ionicons name="location-outline" size={20} color="red" />

                <Text
                  style={{
                    fontFamily: 'fontRegular',
                    fontSize: 18,
                    letterSpacing: 1,
                    color: VARS.color.title,
                  }}>
                  {dataContext.storageData?.city}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
        <View
          style={{
            minWidth: '100%',
            maxWidth: '100%',
            gap: 10,
            paddingBottom: 10,
          }}>
          {dataContext.storageData?.aboutme ? (
            <Text
              style={{
                width: '100%',
                textAlign: 'justify',
                fontFamily: 'fontBold',
                fontSize: 20,
                letterSpacing: 1,
              }}>
              {lang.aboutme}
            </Text>
          ) : null}
          <Text
            style={{
              textAlign: 'justify',
              fontFamily: 'fontRegular',
              fontSize: 18,
              letterSpacing: 1,
            }}>
            {dataContext.storageData?.aboutme}
          </Text>
        </View>
        <View style={{ gap: 10, paddingBottom: 20, alignItems: 'center' }}>
          <Btn
            label={lang.listUser}
            color={VARS.color.blue}
            iconColor={VARS.color.white}
            iconSize={VARS.size.icons}
            onPress={() => {
              navigation.navigate('ListUser');
            }}
          />
          <Btn
            label={lang.credentials}
            color={VARS.color.blue}
            iconColor={VARS.color.white}
            iconSize={VARS.size.icons}
            onPress={() => {
              navigation.navigate('Credentials');
            }}
          />
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              backgroundColor: VARS.color.white,
              borderRadius: 18,
              alignItems: 'center',
              justifyContent: 'space-around',
              borderWidth: 1,
              borderColor: VARS.color.whiteDark,
              elevation: 10,
              padding: 8,
              paddingHorizontal: 25,
              marginVertical: 15,
              marginTop: 20,
              margin: 5,
              color: VARS.color.black,
            }}
            onPress={() => {
              setLoading(true);
              handleSignOut();
              setLoading(false);
            }}>
            <Text
              style={{
                fontFamily: 'fontRegular',
                fontSize: 18,
                letterSpacing: 1,
              }}>
              {lang.exit}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
