import firestore from '@react-native-firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native';
import Btn from '../../components/Btn/intex';
import { VARS } from '../../constants/VARS';
import { AuthContext } from '../../contexts/auth';
import getDataUserFirebase from '../../functions/getDataUserFirebase';
import styles from '../../styles/styles';
import { oficinas, painel } from './atividades';
import { Atividade, Aviso, Botoes, Confirmacao } from './structure';

export default function Cursos() {
  const { dataContext } = useContext(AuthContext);

  const [activeAba, setActiveAba] = useState(1);
  const [painelSelected, setPainelSelected] = useState();
  const [oficinaSelected, setOficinaSelected] = useState([]);
  const [meusCursos, setMeusCursos] = useState({});
  const [vagas, setVagas] = useState({});

  useEffect(() => {
    if (!dataContext.storageData?.inscrito) {
      const cursos = {
        painel: painelSelected,
        oficina1: oficinaSelected[0],
        oficina2: oficinaSelected[1],
      };
      setMeusCursos(cursos);
    }
  }, [painelSelected, oficinaSelected]);

  useEffect(() => {
    if (!dataContext.storageData?.inscrito) {
      painel.map((value, index) => {
        checkVacancy('painel', value.id, value.vaga, index);
      });
      oficinas.map((value, index) => {
        checkVacancy('oficina', value.id, value.vaga, index);
      });
    }
  }, [painelSelected, oficinaSelected]);

  useEffect(() => {
    if (dataContext.storageData?.inscrito) {
      const cursos = {
        painel: dataContext.storageData?.painel,
        oficina1: dataContext.storageData?.oficina1,
        oficina2: dataContext.storageData?.oficina2,
      };
      setPainelSelected(dataContext.storageData?.painel);
      setOficinaSelected([
        dataContext.storageData?.oficina1,
        dataContext.storageData?.oficina2,
      ]);
      setMeusCursos(cursos);
    }
  }, []);

  const checkVacancy = async (type, id, vaga, index) => {
    const inscritos = [];
    await firestore()
      .collection('checkin')
      .doc(id)
      .collection('users')
      .get()
      .then(result => {
        result.forEach(doc => {
          doc.data().uid = doc.id;
          inscritos.push(doc.data());
        });
        const quant = inscritos.length;
        const arr = vagas;
        arr[id] = vaga * 1 - quant;
        if (type == 'painel') setVagas(arr);
        if (type == 'oficina') setVagas(arr);
        return;
      })
      .catch(err => {
        console.log(err);
      });
    return;
  };

  function addOficina(valueId) {
    const arr = oficinaSelected;
    if (arr.includes(valueId)) {
      const indice = arr.indexOf(valueId);
      if (indice !== -1) {
        arr.splice(indice, 1);
        newArr = arr.slice(-2);
        setOficinaSelected(newArr);
        return;
      }
    }
    if (!arr.includes(valueId)) {
      arr.push(valueId);
      newArr = arr.slice(-2);
      setOficinaSelected(newArr);
      return;
    }
  }

  const handleMeusCursos = () => {
    setFirebase(meusCursos.painel);
    setFirebase(meusCursos.oficina1);
    setFirebase(meusCursos.oficina2);
  };

  const abaChange = state => {
    setActiveAba(state);
  };

  const setFirebase = async doc => {
    await firestore()
      .collection('checkin')
      .doc(doc)
      .collection('users')
      .doc(dataContext.user?.uid)
      .set({
        createdAt: new Date(),
        name: dataContext.user?.uid,
        email: dataContext.storageData?.email,
      })
      .then(async () => {
        await firestore()
          .collection('user')
          .doc(dataContext.user?.uid)
          .update({
            inscrito: true,
            painel: painelSelected,
            oficina1: oficinaSelected[0],
            oficina2: oficinaSelected[1],
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
            paddingTop: 15,
            paddingHorizontal: 0,
          }}>
          {dataContext.storageData?.inscrito ? null : <Aviso />}
          <Botoes abaChange={abaChange} />
          {activeAba == '1' &&
            painel.map((value, index) => {
              return (
                <Atividade
                  onPress={() => {
                    if (!dataContext.storageData?.inscrito) {
                      if (vagas[value.id] > 0) setPainelSelected(value.id);
                      if (vagas[value.id] <= 0) alert('vagas esgotadas');
                    }
                  }}
                  key={index}
                  selected={value.id == painelSelected}
                  time={value.time}
                  title={value.title}
                  owner={value.owner}
                  id={value.id}
                  vaga={vagas[value.id]}
                />
              );
            })}
          {activeAba == '2' &&
            oficinas.map((value, index) => {
              return (
                <Atividade
                  onPress={() => {
                    if (!dataContext.storageData?.inscrito) {
                      addOficina(value.id);
                    }
                  }}
                  key={index}
                  time={value.time}
                  selected={oficinaSelected.includes(value.id)}
                  title={value.title}
                  owner={value.owner}
                  id={value.id}
                  vaga={vagas[value.id]}
                />
              );
            })}
          <Confirmacao data={meusCursos} />
          {!dataContext.storageData?.inscrito && (
            <Btn
              label="Salvar"
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
