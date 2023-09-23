import firestore from '@react-native-firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import Btn from '../../components/Btn/intex';
import Loading from '../../components/Loading';
import { VARS } from '../../constants/VARS';
import { AuthContext } from '../../contexts/auth';
import getDataUserFirebase from '../../functions/getDataUserFirebase';
import styles from '../../styles/styles';
import { oficinasD13, oficinasD14 } from './atividades';
import { Atividades, Aviso, Botoes, Confirmacao } from './structure';

export default function Cursos() {
  const [activeAba, setActiveAba] = useState(2);
  const [meusCursos, setMeusCursos] = useState({});
  const [editable, setEditable] = useState(false);
  const [vagas, setVagas] = useState();
  const [loading, setLoading] = useState(false);

  const { dataContext, locale } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

  useEffect(() => {
    if (dataContext.storageData.inscrito) {
      setEditable(false); //libera e esconde aviso
      const newCursos = {};
      newCursos['oficina1'] = dataContext.storageData.oficina1;
      newCursos['oficina2'] = dataContext.storageData.oficina2;
      setMeusCursos(newCursos);
    }
    if (!dataContext.storageData.inscrito) {
      setEditable(true);
      getVagas();
    }
  }, [dataContext]);

  const getVagas = async () => {
    await firestore()
      .collection('configs')
      .doc('vagas')
      .get()
      .then(result => {
        setVagas(result._data);
        return null;
      })
      .catch(err => {
        console.error('erro no banco:', err);
      });
  };

  function AddOficina1(valueId) {
    if (editable) {
      const newCursos = {};
      newCursos['uid'] = dataContext.user.uid;
      if (valueId?.slice(0, -4) != meusCursos.oficina2?.slice(0, -4))
        newCursos['oficina1'] = valueId;
      if (valueId?.slice(0, -4) == meusCursos.oficina2?.slice(0, -4))
        Alert.alert(
          'Atenção',
          'Escolha outra oficina, esta já foi selecionada outro dia',
        );
      meusCursos.oficina2
        ? (newCursos['oficina2'] = meusCursos.oficina2)
        : null;
      setMeusCursos(newCursos);
      return;
    }
  }
  function AddOficina2(valueId) {
    if (editable) {
      const newCursos = {};
      newCursos['uid'] = dataContext.user.uid;
      if (valueId?.slice(0, -4) != meusCursos.oficina1?.slice(0, -4))
        newCursos['oficina2'] = valueId;
      if (valueId?.slice(0, -4) == meusCursos.oficina1?.slice(0, -4))
        Alert.alert(
          'Atenção',
          'Escolha outra oficina, esta já foi selecionada outro dia',
        );
      meusCursos.oficina1
        ? (newCursos['oficina1'] = meusCursos.oficina1)
        : null;
      setMeusCursos(newCursos);
      return;
    }
  }

  const handleMeusCursos = () => {
    if (meusCursos.oficina1 && meusCursos.oficina2) {
      setEditable(false);
      setFirebase(meusCursos).then(() => {
        Alert.alert(lang.congrats, lang.inscSucess, [
          {
            text: 'OK',
            onPress: () => setLoading(false),
          },
        ]);
      });
    }
    if (!meusCursos.oficina1 || !meusCursos.oficina2) {
      Alert.alert('Atenção', 'Escolha uma oficina para cada dia');
    }
  };

  const abaChange = state => {
    setActiveAba(state);
  };

  const atividadeChange = state => {
    const newState = {};
    newState['oficina1'] = meusCursos.oficina1;
    newState['oficina2'] = meusCursos.oficina2;
    if (newState.oficina1 == state) newState['oficina1'] = undefined;
    if (newState.oficina2 == state) newState['oficina2'] = undefined;
    setMeusCursos(newState);
  };

  const setFirebase = async ({ oficina1, oficina2 }) => {
    await firestore()
      .collection('checkin')
      .doc(oficina1)
      .collection('users')
      .doc(dataContext.user?.uid)
      .set({
        createdAt: new Date(),
        uid: dataContext.user?.uid,
        name: dataContext.storageData?.name,
        email: dataContext.storageData?.email,
      })
      .then(async () => {
        await firestore()
          .collection('user')
          .doc(dataContext.user?.uid)
          .update({
            inscrito: true,
            // painel: meusCursos.painel,
            oficina1: meusCursos.oficina1,
            oficina2: meusCursos.oficina2,
          })
          .then(value => {
            getDataUserFirebase(dataContext);
          })
          .catch(err => {
            console.error('erro no banco:', err);
          })
          .then(() => {})
          .catch(err => {
            console.error('erro no banco:', err);
          });
      })
      .catch(err => {
        console.error('erro no banco:', err);
      });
    await firestore()
      .collection('checkin')
      .doc(oficina1)
      .set({
        list: true,
      })
      .then(() => {})
      .catch(err => {
        console.error('erro no banco:', err);
      });
    await firestore()
      .collection('checkin')
      .doc(oficina2)
      .collection('users')
      .doc(dataContext.user?.uid)
      .set({
        createdAt: new Date(),
        uid: dataContext.user?.uid,
        name: dataContext.storageData?.name,
        email: dataContext.storageData?.email,
      })
      .then(async () => {
        await firestore()
          .collection('user')
          .doc(dataContext.user?.uid)
          .update({
            inscrito: true,
            oficina1: meusCursos.oficina1,
            oficina2: meusCursos.oficina2,
          })
          .then(value => {
            getDataUserFirebase(dataContext);
          })
          .catch(err => {
            console.error('erro no banco:', err);
          })
          .then(() => {})
          .catch(err => {
            console.error('erro no banco:', err);
          });
      })
      .catch(err => {
        console.error('erro no banco:', err);
      });
    await firestore()
      .collection('checkin')
      .doc(oficina2)
      .set({
        list: true,
      })
      .then(() => {})
      .catch(err => {
        console.error('erro no banco:', err);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 140 : 0}
      style={[
        styles.keyboardAvoidingView,
        {
          width: '100%',
          backgroundColor: 'transparent',
        },
      ]}>
      {loading && <Loading />}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{ width: '100%' }}
        contentContainerStyle={{
          alignItems: 'center',
          gap: 6,
          paddingBottom: 20,
          paddingTop: editable ? 0 : 15,
          paddingHorizontal: 0,
        }}>
        {editable && <Aviso />}
        <Botoes abaChange={abaChange} />
        {activeAba == '2' &&
          oficinasD13.map((value, index) => {
            return (
              <Atividades
                onPress={() => {
                  AddOficina1(value.id);
                }}
                key={index}
                atividadeChange={atividadeChange}
                selected={value.id == meusCursos.oficina1}
                time={value.time}
                dia="dia13"
                editable={editable}
                title={value.title}
                owner={value.owner}
                number={value.num}
                id={value.id}
                vaga={vagas ? vagas[value.id] : null}
              />
            );
          })}
        {activeAba == '3' &&
          oficinasD14.map((value, index) => {
            return (
              <Atividades
                onPress={() => {
                  AddOficina2(value.id);
                }}
                key={index}
                atividadeChange={atividadeChange}
                selected={value.id == meusCursos.oficina2}
                time={value.time}
                editable={editable}
                title={value.title}
                owner={value.owner}
                number={value.num}
                id={value.id}
                vaga={vagas ? vagas[value.id] : null}
              />
            );
          })}

        <Confirmacao data={meusCursos} />
        {editable && (
          <Btn
            label={lang.save}
            color={VARS.color.blue}
            icon="checkmark-circle-outline"
            iconSize={VARS.size.icons * 0.8}
            iconColor={VARS.color.white}
            disable={false}
            onPress={async () => {
              setLoading(true);
              handleMeusCursos();
            }}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
