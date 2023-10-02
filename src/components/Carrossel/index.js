import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import * as imagePiker from 'expo-image-picker';
import { useContext, useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { VARS } from '../../constants/VARS';
import { AuthContext } from '../../contexts/auth';
import Card from '../Card';
import InputTxt from '../InputTxt';
import Loading from '../Loading';

export default function Carrossel({ id, data, label, updatePage }) {
  const [input, setInput] = useState();
  const [edit, setEdit] = useState();
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  const { dataContext, locale } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

  const handleGetFile = async () => {
    const options = {
      noData: true,
      mediaType: 'photo',
      aspect: [1, 1],
    };
    const result = await imagePiker.launchImageLibraryAsync(options);
    if (!result.canceled) {
      uploadImage(result.assets[0].uri).then(res => {
        updateImage(res.metadata.fullPath);
      });
    }
    if (result.canceled) {
      setInput('');
      setDisable(false);
      setLoading(false);
    }
  };

  const uploadImage = async response => {
    const subfolderName = id;
    const uniqueFileName = `${Date.now()}`;
    const filePath = `${subfolderName}/${uniqueFileName}`;
    const storegaRef = storage().ref('configs').child(filePath);
    return await storegaRef.putFile(response);
  };

  const updateImage = async path => {
    const storageRef = storage().ref().child(path);
    const url = await storageRef
      .getDownloadURL()
      .then(async image => {
        const dados = {};
        image ? (dados['photoURL'] = image) : null;
        input ? (dados['linkURL'] = input) : null;
        dados['createdAt'] = firestore.FieldValue.serverTimestamp();
        await firestore()
          .collection('configs')
          .doc(id)
          .collection('images')
          .doc()
          .set(dados)
          .then(() => {})
          .catch(err => {
            console.error('erro no banco:', err);
          });
      })
      .catch(error => {
        console.log('ERROR AO ATUALIZAR FOTO DOS POSTS ', error);
      });
    update();
    setInput('');
    setDisable(false);
    setLoading(false);
  };

  const update = () => {
    updatePage();
  };

  return (
    <View
      style={{
        gap: 5,
        paddingHorizontal: 0,
        width: '100%',
      }}>
      {loading && <Loading />}
      <View
        style={{
          flexDirection: 'row',
          maxWidth: '100%',
          gap: 5,
          paddingHorizontal: 15,
          justifyContent: 'space-between',
        }}>
        {label && (
          <Text
            style={{
              fontFamily: 'fontRegular',
              fontSize: 20,
              letterSpacing: 1,
              flex: 1,
            }}>
            {label}
          </Text>
        )}
        {dataContext.storageData?.superAdm && !disable && (
          <Switch
            style={{
              transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
            }}
            onValueChange={() => {
              setEdit(!edit);
            }}
            value={edit}
          />
        )}
      </View>
      {edit && (
        <View
          style={{
            width: '100%',
            gap: 8,
            padding: 10,
          }}>
          <InputTxt
            icon=""
            multiline={false}
            placeholder={lang.Link}
            security={false}
            editable={true}
            value={input}
            onChangeText={txt => {
              txt ? setInput(txt.toLowerCase()) : setInput(txt);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setLoading(true);
              setDisable(true);
              setEdit(false);
              handleGetFile();
            }}
            activeOpacity={0.8}
            style={{
              width: 150,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              paddingHorizontal: 10,
              backgroundColor: VARS.color.white,
              elevation: 2,
              borderWidth: 1,
              borderColor: VARS.color.blueLight,
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontFamily: 'fontRegular',
                fontSize: 16,
                letterSpacing: 1,
                color: 'black',
              }}>
              Add image
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          columnGap: 5,
          minWidth: '100%',
          paddingHorizontal: 8,
          paddingBottom: 4,
        }}
        horizontal={true}>
        {data?.map((info, index) => {
          return <Card key={index} info={info} id={id} update={update} />;
        })}
        {!data ? null : (
          <View
            style={{
              width: '100%',
              height: 20,
            }}></View>
        )}
      </ScrollView>
    </View>
  );
}
