import firestore from '@react-native-firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import Carrossel from '../../components/Carrossel';
import Loading from '../../components/Loading';
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
  const [loading, setLoading] = useState(true);

  const { locale } = useContext(AuthContext);
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
  ];

  useFocusEffect(
    useCallback(() => {
      updatePage();
      header &&
        Image.getSize(header, (w, h) => {
          setAspectHeader(w / h);
        });
    }, []),
  );

  useEffect(() => {
    header &&
      Image.getSize(header, (w, h) => {
        setAspectHeader(w / h);
      });
  }, [header]);

  const updatePage = () => {
    const allProm = [];
    list.map(item => {
      allProm.push(getDados(item));
    });
    Promise.all(allProm);
  };

  const getDados = async doc => {
    const check = [];
    await firestore()
      .collection('configs')
      .doc(doc)
      .collection('images')
      .orderBy('createdAt', 'asc')
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
    doc == 'header' ? setHeader(check['0'].photoURL) : null;
    setLoading(false);
    return check;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View
      style={[
        styles.container,
        {
          alignItems: 'center',
          paddingHorizontal: 0,
        },
      ]}>
      {header && (
        <View style={{ padding: 15 }}>
          <Image
            style={{
              width: '100%',
              aspectRatio: aspectHeader,
              resizeMode: 'contain',
              paddingHorizontal: 20,
            }}
            source={{ uri: header }}
          />
        </View>
      )}
      <ScrollView
        contentContainerStyle={{
          width: '100%',
          paddingVertical: 8,
          gap: 10,
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
      </ScrollView>
    </View>
  );
}
