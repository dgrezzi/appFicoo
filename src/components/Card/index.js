import { Ionicons } from '@expo/vector-icons';
import { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { VARS } from '../../constants/VARS';
import { AuthContext } from '../../contexts/auth';
import Loading from '../Loading';

export default function Card({ info }) {
  const [image, setImage] = useState();
  const [aspect, setAspect] = useState();

  const { locale } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

  useEffect(() => {
    setImage(info?.photoURL);
    Image.getSize(info?.photoURL, (w, h) => {
      setAspect(w / h);
    });
  }, [info]);

const handleDelete = ()=>{
//implementacao del card
  return
}

  return (
    <TouchableOpacity
      activeOpacity={1}
      onLongPress={() => {handleDelete()}}
      onPress={() => {
        info.linkURL &&
          Alert.alert(
            'Atenção!',
            'Você será redirecionado para um site externo',
            [
              {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => Linking.openURL(info.linkURL),
              },
            ],
          );
      }}>
      <View
        style={{
          backgroundColor: VARS.color.white,
          borderRadius: 18,
          alignItems: 'center',
          height: 200,
          minWidth:200,
          borderWidth: 1,
          borderColor: VARS.color.whiteDark,
          elevation: 10,
          padding: 8,
          marginBottom: 15,
          margin: 5,
        }}>
        {info.linkURL && (
          <View
            style={{
              flex:1,
              position: 'absolute',
              zIndex: 99,
              padding: 5,
              backgroundColor: VARS.color.blue,
              borderRadius: 30,
              paddingHorizontal: 10,
              bottom: 12,
              right: 12,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
            }}>
            <Text
              style={{
                color: VARS.color.white,
                fontFamily: 'fontRegular',
                fontSize: 14,
                letterSpacing: 1,
              }}>
              {lang.more}
            </Text>
            <Ionicons
              name="arrow-forward-circle"
              size={VARS.size.icons * 0.6}
              color={VARS.color.orange}
            />
          </View>
        )}
        {image && (
          <Image
            style={{
              height: '100%',
              width:'100%',
              aspectRatio: aspect,
              borderWidth: 1,
              borderColor:VARS.color.whiteOpacity,
              borderRadius: 10,
              resizeMode: 'cover',
              zIndex:999
            }}
            source={{ uri: image }}
            />
        )}
      </View>
    </TouchableOpacity>
  );
}
