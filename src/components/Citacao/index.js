import firestore from '@react-native-firebase/firestore';
import { useContext } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { VARS } from '../../constants/VARS';
import { AuthContext } from '../../contexts/auth';

export default function Citacao({ info, id, update }) {
  const { locale, dataContext } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

  const handleDelete = async () => {
    await firestore()
      .collection('configs')
      .doc(id)
      .collection('images')
      .doc(info.uid)
      .delete()
      .then(() => {
        update();
      })
      .catch(err => {
        console.error('erro no banco:', err);
      });
    return;
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onLongPress={() => {
        if (dataContext.storageData?.superAdm == true) {
          Alert.alert('Atenção!', 'Você deseja apagar este conteúdo?', [
            {
              text: 'Cancel',
              onPress: () => {},
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => handleDelete(),
            },
          ]);
        }
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
          borderWidth: 1,
          borderColor: VARS.color.whiteDark,
          elevation: 10,
          padding: 10,
          paddingHorizontal: 25,
          marginBottom: 15,
          margin: 5,
          color: VARS.color.black,
        }}>
        <Text
          style={{ fontFamily: 'fontRegular', letterSpacing: 1, fontSize: 18 }}>
          {info.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
