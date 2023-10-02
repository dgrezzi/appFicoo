import firestore from '@react-native-firebase/firestore';
import { useContext, useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { VARS } from '../../constants/VARS';
import { AuthContext } from '../../contexts/auth';
import Citacao from '../Citacao';
import InputTxt from '../InputTxt';

export default function CarrosselCitacao({ id, data, label, updatePage }) {
  const [input, setInput] = useState();
  const [edit, setEdit] = useState();
  const [disable, setDisable] = useState(false);

  const { dataContext, locale } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

  const handleSetName = async () => {
    const createdAt = firestore.FieldValue.serverTimestamp();
    await firestore()
      .collection('configs')
      .doc(id)
      .collection('images')
      .doc()
      .set({
        name: input,
        createdAt: createdAt,
      })
      .then(() => {})
      .catch(err => {
        console.error('erro no banco:', err);
      });

    update();
    setDisable(false);
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
              color: VARS.color.black,
              flex: 1,
            }}>
            {label}
          </Text>
        )}
        {dataContext.storageData?.superAdm && !disable && (
          <Switch
            style={{
              transform: [{ scaleX: 0.75 }, { scaleY: 0.75 }],
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
            placeholder="Nome do integrante"
            security={false}
            editable={true}
            value={input}
            onChangeText={txt => {
              txt ? setInput(txt) : setInput(txt);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              if (input) {
                setDisable(true);
                setEdit(false);
                setInput('');
                handleSetName();
              }
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
              Add Name
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
          paddingHorizontal: 15,
        }}
        horizontal={true}>
        {data?.map((info, index) => {
          return <Citacao key={index} info={info} id={id} update={update} />;
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
