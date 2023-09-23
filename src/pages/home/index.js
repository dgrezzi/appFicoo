import firestore from '@react-native-firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { Image, RefreshControl, ScrollView, Text, View } from 'react-native';
import Carrossel from '../../components/Carrossel';
import CarrosselCitacao from '../../components/CarrosselCitacao';
import Loading from '../../components/Loading';
import { VARS } from '../../constants/VARS';
import { AuthContext } from '../../contexts/auth';
import styles from '../../styles/styles';

export default function Home() {
  const [header, setHeader] = useState();
  const [aspectHeader, setAspectHeader] = useState();
  const [oficoo, setOficoo] = useState();
  const [conferencia, setConferencia] = useState();
  const [paineis, setPaineis] = useState();
  const [oficinas, setOficinas] = useState();
  const [diver, setDiver] = useState();
  const [parceiros, setParceiros] = useState();
  const [coracao, setCoracao] = useState();
  const [cooperacao, setCooperacao] = useState();
  const [voluntario, setVoluntario] = useState();
  const [loading, setLoading] = useState(true);
  const [imageLoad, setImageLoad] = useState(true);

  const { locale, getActivationCode } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

  const list = [
    'header',
    'oficoo',
    'conferencia',
    'paineis',
    'oficinas',
    'diver',
    'parceiros',
    'coracao',
    'cooperacao',
    'voluntario',
    'ativo',
  ];

  useEffect(() => {
    getActivationCode();
    updatePage();
    header &&
      Image.getSize(header, (w, h) => {
        setAspectHeader(w / h);
      });
  }, []);

  useEffect(() => {
    header &&
      Image.getSize(header, (w, h) => {
        setAspectHeader(w / h);
      });
  }, [header]);

  const updatePage = () => {
    setLoading(true);
    list.map(item => {
      getDados(item);
    });
  };

  const onRefresh = React.useCallback(() => {
    setLoading(true);
    updatePage();
  }, []);

  const getDados = async doc => {
    const check = [];
    await firestore()
      .collection('configs')
      .doc(doc)
      .collection('images')
      .orderBy('createdAt', 'desc')
      .get()
      .then(result => {
        result.forEach(doc => {
          doc.data().uid = doc.id;
          check.push(doc.data());
        });
        return null;
      })
      .catch(err => {
        console.error('erro no banco:', err);
      });
    doc == 'oficoo' ? setOficoo(check) : null;
    doc == 'conferencia' ? setConferencia(check) : null;
    doc == 'paineis' ? setPaineis(check) : null;
    doc == 'oficinas' ? setOficinas(check) : null;
    doc == 'diver' ? setDiver(check) : null;
    doc == 'parceiros' ? setParceiros(check) : null;
    doc == 'coracao' ? setCoracao(check.reverse()) : null;
    doc == 'cooperacao' ? setCooperacao(check.reverse()) : null;
    doc == 'voluntario' ? setVoluntario(check.reverse()) : null;
    doc == 'header' ? setHeader(check['0'].photoURL) : null;
    setLoading(false);
    return check;
  };
  return (
    <View
      style={[
        styles.container,
        {
          alignItems: 'center',
          paddingHorizontal: 0,
        },
        Platform.OS === 'ios' ? styles.ios : null,
      ]}>
      {loading && <Loading />}
      {header && (
        <View style={{ padding: 10 }}>
          {header && imageLoad && <Loading />}
          <Image
            style={[
              {
                width: '85%',
                aspectRatio: aspectHeader,
                resizeMode: 'contain',
              },
              imageLoad && { aspectRatio: 2 },
            ]}
            onLoad={() => {
              setImageLoad(false);
            }}
            source={{ uri: header }}
          />
        </View>
      )}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        contentContainerStyle={{
          width: '100%',
          paddingVertical: 8,
          gap: 4,
        }}>
        <Carrossel
          id="oficoo"
          label={lang.homeOficoo}
          data={oficoo}
          updatePage={updatePage}
        />
        <Carrossel
          id="conferencia"
          label={lang.homeConf}
          data={conferencia}
          updatePage={updatePage}
        />
        <Carrossel
          id="paineis"
          label={lang.homePaineis}
          data={paineis}
          updatePage={updatePage}
        />
        <Carrossel
          id="oficinas"
          label={lang.homeOficinas}
          data={oficinas}
          updatePage={updatePage}
        />
        <Carrossel
          id="diver"
          label={lang.homeDesafio}
          data={diver}
          updatePage={updatePage}
        />
        <Carrossel
          id="parceiros"
          label={lang.homeComunidade}
          data={parceiros}
          updatePage={updatePage}
        />
        <CarrosselCitacao
          id="coracao"
          label={lang.homeCoracao}
          data={coracao}
          updatePage={updatePage}
        />
        <CarrosselCitacao
          id="cooperacao"
          label={lang.homeCooperacao}
          data={cooperacao}
          updatePage={updatePage}
        />
        <CarrosselCitacao
          id="voluntario"
          label={lang.homeVoluntario}
          data={voluntario}
          updatePage={updatePage}
        />
        <Text
          style={{
            fontFamily: 'fontRegular',
            fontSize: 20,
            letterSpacing: 1,
            marginHorizontal: 15,
            color: VARS.color.black,
          }}>
          {lang.development}
        </Text>
        <View style={{ paddingHorizontal: 10 }}>
          <View
            style={{
              backgroundColor: VARS.color.white,
              borderRadius: 18,
              alignItems: 'flex-start',
              justifyContent: 'space-around',
              borderWidth: 1,
              borderColor: VARS.color.whiteDark,
              elevation: 10,
              padding: 18,
              marginBottom: 15,
              margin: 5,
              color: VARS.color.black,
              gap: 10,
            }}>
            <Text
              style={{
                width: '100%',
                fontFamily: 'fontBold',
                fontSize: 20,
                letterSpacing: 1,
                textAlign: 'center',
              }}>
              {lang.dgSystem}
            </Text>
            <Text
              style={{
                fontFamily: 'fontRegular',
                fontSize: 18,
                letterSpacing: 1,
                textAlign: 'justify',
              }}>
              {lang.dgNames}
            </Text>
            <Text
              style={{
                fontFamily: 'fontRegular',
                fontSize: 18,
                letterSpacing: 1,
                textAlign: 'justify',
              }}>
              {lang.dgContato}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
