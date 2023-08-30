import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Btn from '../../components/Btn/intex';
import BtnEdit from '../../components/BtnEdit/intex';
import { VARS } from '../../constants/VARS';
import { AuthContext } from '../../contexts/auth';
import getDataUserFirebase from '../../functions/getDataUserFirebase';
import handleSignOut from '../../functions/handleSignOut';
import styles from '../../styles/styles';

export default function Profile() {
  const { locale } = useContext(AuthContext);
  const navigation = useNavigation();

  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

  const { dataContext, setLoading } = useContext(AuthContext);
  const [imageLoad, setImageLoad] = useState(false);

  const [photoAvatar, setPhotoAvatar] = useState(
    'https://firebasestorage.googleapis.com/v0/b/appficoo-ebbf0.appspot.com/o/avatarM.jpg?alt=media&token=a494693c-611f-435a-b34a-d54fcc38461d',
  );

  useEffect(() => {
    setLoading(false);
    dataContext.storageData?.photoURL
      ? setPhotoAvatar(dataContext.storageData.photoURL)
      : setPhotoAvatar(
          'https://firebasestorage.googleapis.com/v0/b/appficoo-ebbf0.appspot.com/o/avatarM.jpg?alt=media&token=a494693c-611f-435a-b34a-d54fcc38461d',
        );
  }, [dataContext]);

  useFocusEffect(
    useCallback(() => {
      getDataUserFirebase(dataContext);
    }, []),
  );

  return (
    <View style={[styles.container, { paddingTop: 0, paddingHorizontal: 0 }]}>
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
          label="Inscrição"
          labelColor={VARS.color.white}
          color={VARS.color.orange}
          icon="alert-outline"
          iconColor={VARS.color.white}
          fontFamily="AbelBold"
          iconSize={VARS.size.icons * 0.8}
        />
        <BtnEdit
          onPress={() => {
            navigation.navigate('EditProfile');
          }}
          label="Editar"
          labelColor={VARS.color.blue}
          color={VARS.color.whiteDark}
          icon="pencil"
          iconColor={VARS.color.blue}
          iconSize={VARS.size.icons * 0.8}
        />
      </View>
      <ScrollView
        contentContainerStyle={[
          {
            backgroundColor: VARS.color.white,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5,
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
            gap: 22,
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
              <Image
                style={{
                  borderRadius: VARS.size.avatar,
                  marginBottom: 10,
                  width: '100%',
                  height: '100%',
                }}
                source={{ uri: photoAvatar }}
              />
              {/* colocar icone camera AQUI*/}
            </View>
          )}
          <View style={{ alignItems: 'center', gap: 5 }}>
            <Text
              style={{
                fontFamily: 'AbelBold',
                fontSize: 22,
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
                  fontFamily: 'Abel',
                  fontSize: 20,
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
                    fontFamily: 'Abel',
                    fontSize: 18,
                    letterSpacing: 1,
                    color: VARS.color.title,
                  }}>
                  {dataContext.storageData?.phone}
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
                    fontFamily: 'Abel',
                    fontSize: 20,
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
                fontFamily: 'AbelBold',
                fontSize: 20,
                letterSpacing: 1,
              }}>
              Sobre mim:
            </Text>
          ) : null}
          <Text
            style={{
              textAlign: 'justify',
              fontFamily: 'Abel',
              fontSize: 18,
              letterSpacing: 1,
            }}>
            {dataContext.storageData?.aboutme}
          </Text>
        </View>

        <View
          style={{
            width: '100%',
            alignItems: 'center',
            marginBottom: 10,
            gap: 10,
          }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              navigation.navigate('ListUser');
            }}
            style={{
              padding: 4,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Abel',
                color: VARS.color.blue,
                textDecorationLine: 'underline',

                fontSize: 20,
                letterSpacing: 1,
              }}>
              LISTA DE PARTICIPANTES
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              navigation.navigate('Credentials');
            }}
            style={{
              padding: 4,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Abel',
                color: VARS.color.blue,
                textDecorationLine: 'underline',

                fontSize: 20,
                letterSpacing: 1,
              }}>
              CREDENCIAIS FICOO 2023
            </Text>
          </TouchableOpacity>
        </View>

        <Btn
          label="Sair"
          color={VARS.color.blue}
          icon="exit-outline"
          iconColor={VARS.color.white}
          iconSize={VARS.size.icons}
          onPress={() => {
            setLoading(true);
            handleSignOut();
          }}
        />
      </ScrollView>
    </View>
  );
}
