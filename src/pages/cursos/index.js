import firestore from '@react-native-firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native';
import Btn from '../../components/Btn/intex';
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

  const { dataContext, locale } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

  useEffect(() => {
    if (dataContext.storageData.inscrito) {
      setEditable(false); //libera e esconde aviso
      const newCursos = {};
      // newCursos['painel'] = dataContext.storageData.painel;
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

  // function AddPainel(valueId) {
  //   if (editable) {
  //     const newCursos = {};
  //     newCursos['uid'] = dataContext.user.uid;
  //     newCursos.painel = valueId;
  //     meusCursos.oficina1
  //       ? (newCursos.oficina1 = meusCursos.oficina1)
  //       : undefined;
  //     meusCursos.oficina2
  //       ? (newCursos.oficina2 = meusCursos.oficina2)
  //       : undefined;
  //     setMeusCursos(newCursos);
  //     return;
  //   }
  // }

  function AddOficina1(valueId) {
    if (editable) {
      const newCursos = {};
      newCursos['uid'] = dataContext.user.uid;
      // meusCursos.painel ? (newCursos['painel'] = meusCursos.painel) : null;
      if (valueId?.slice(0, -4) != meusCursos.oficina2?.slice(0, -4))
        newCursos['oficina1'] = valueId;
      if (valueId?.slice(0, -4) == meusCursos.oficina2?.slice(0, -4))
        alert('escolha outra oficina');
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
      // meusCursos.painel ? (newCursos['painel'] = meusCursos.painel) : null;
      if (valueId?.slice(0, -4) != meusCursos.oficina1?.slice(0, -4))
        newCursos['oficina2'] = valueId;
      if (valueId?.slice(0, -4) == meusCursos.oficina1?.slice(0, -4))
        alert('escolha outra oficina');
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
      setFirebase(meusCursos);
    }
    if (!meusCursos.oficina1 || !meusCursos.oficina2) {
      alert('Escolha uma oficina para cada dia');
    }
  };

  const abaChange = state => {
    setActiveAba(state);
  };

  const atividadeChange = state => {
    const newState = {};
    // newState['painel'] = meusCursos.painel;
    newState['oficina1'] = meusCursos.oficina1;
    newState['oficina2'] = meusCursos.oficina2;
    // if (newState.painel == state) newState['painel'] = undefined;
    if (newState.oficina1 == state) newState['oficina1'] = undefined;
    if (newState.oficina2 == state) newState['oficina2'] = undefined;
    setMeusCursos(newState);
  };

  const setFirebase = async ({ oficina1, oficina2 }) => {
    // await firestore()
    //   .collection('checkin')
    //   .doc(painel)
    //   .collection('users')
    //   .doc(dataContext.user?.uid)
    //   .set({
    //     createdAt: new Date(),
    //     uid: dataContext.user?.uid,
    //     name: dataContext.storageData?.name,
    //     email: dataContext.storageData?.email,
    //   })
    //   .then(async () => {
    //     await firestore()
    //       .collection('user')
    //       .doc(dataContext.user?.uid)
    //       .update({
    //         inscrito: true,
    //         painel: meusCursos.painel,
    //         oficina1: meusCursos.oficina1,
    //         oficina2: meusCursos.oficina2,
    //       })
    //       .then(value => {
    //         getDataUserFirebase(dataContext);
    //       })
    //       .catch(err => {
    //         console.error('erro no banco:', err);
    //       })
    //       .then(() => {})
    //       .catch(err => {
    //         console.error('erro no banco:', err);
    //       });
    //   })
    //   .catch(err => {
    //     console.error('erro no banco:', err);
    //   });
    // await firestore()
    //   .collection('checkin')
    //   .doc(painel)
    //   .set({
    //     list: true,
    //   })
    //   .then(() => {})
    //   .catch(err => {
    //     console.error('erro no banco:', err);
    //   });
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
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: VARS.color.white, paddingHorizontal: 0 },
      ]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        style={[
          styles.keyboardAvoidingView,
          {
            width: '100%',
            backgroundColor: 'transparent',
          },
        ]}>
        <ScrollView
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
          {/* {activeAba == '1' &&
            paineis.map((value, index) => {
              return (
                <Atividades
                  onPress={() => {
                    AddPainel(value.id);
                  }}
                  key={index}
                  atividadeChange={atividadeChange}
                  selected={value.id == meusCursos.painel}
                  time={value.time}
                  editable={editable}
                  title={value.title}
                  number={value.num}
                  owner={value.owner}
                  id={value.id}
                  vaga={vagas ? vagas[value.id] : null}
                />
              );
            })} */}
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
                handleMeusCursos();
              }}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
