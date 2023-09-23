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
  const [imageLoad, setImageLoad] = useState(true);

  const { locale } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

  useEffect(() => {
    setImage(info?.photoURL);
    Image.getSize(info?.photoURL, (w, h) => {
      setAspect(w / h);
    });
  }, [info]);

  const handleDelete = () => {
    //implementacao del card
    return;
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onLongPress={() => {
        handleDelete();
      }}
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
          height: 190,
          minWidth: 150,
          borderWidth: 1,
          borderColor: VARS.color.whiteDark,
          elevation: 10,
          padding: 8,
          marginBottom: 15,
          margin: 5,
        }}>
        {imageLoad && <Loading />}
        {info.linkURL && !imageLoad && (
          <View
            style={{
              flex: 1,
              position: 'absolute',
              bottom: 10,
              right: 8,
              zIndex: 999,
              padding: 4,
              paddingHorizontal: 12,
              backgroundColor: VARS.color.white,
              borderRadius: 30,
              borderWidth: 1,
              borderColor: VARS.color.whiteOpacity,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
              elevation: 5,
            }}>
            <Text
              style={{
                color: VARS.color.title,
                fontFamily: 'fontRegular',
                fontSize: 14,
                letterSpacing: 1,
              }}>
              {lang.more}
            </Text>
            <Ionicons
              name="arrow-forward-circle"
              size={VARS.size.icons * 0.5}
              color={VARS.color.orange}
            />
          </View>
        )}
        {image && (
          <Image
            style={{
              height: '100%',
              width: '100%',
              aspectRatio: aspect,
              borderWidth: 0,
              borderColor: VARS.color.whiteOpacity,
              borderRadius: 10,
              resizeMode: 'cover',
              zIndex: 990,
            }}
            onLoad={() => {
              setImageLoad(false);
            }}
            source={{ uri: image }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}
