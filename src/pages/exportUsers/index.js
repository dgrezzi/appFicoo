import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Loading from '../../components/Loading';
import exportXls from '../../functions/exportXls';
import styles from '../../styles/styles';

export default function ExportUsers() {
  const [load, setLoad] = useState(true);
  // const [users, setUsers] = useState();
  const users = [];

  const dados = [
    {
      aba: 'Users',
      data: users,
    },
  ];

  useEffect(() => {
    getDocs();
    return;
  }, []);

  const chave13 = [
    'oficina1-d13',
    'oficina2-d13',
    'oficina3-d13',
    'oficina4-d13',
    'oficina5-d13',
    'oficina6-d13',
    'oficina7-d13',
    'oficina8-d13',
    'oficina9-d13',
    'oficina10-d13',
  ];
  const chave14 = [
    'oficina1-d14',
    'oficina2-d14',
    'oficina3-d14',
    'oficina4-d14',
    'oficina5-d14',
    'oficina6-d14',
    'oficina7-d14',
    'oficina8-d14',
    'oficina9-d14',
    'oficina10-d14',
  ];

  const getDocs = async () => {
    console.log('Start');
    const list = [];
    await firestore()
      .collection('user')
      // .limit(10)
      .get()
      .then(result => {
        result.forEach(doc => {
          doc.data().uid = doc.id;
          if (doc.data().disableView != true && doc.data().disableAt == null) {
            delete doc.data().pwd;
            delete doc.data().isAdmin;
            delete doc.data().photoURL;
            delete doc.data().createdAt;
            delete doc.data().superAdm;
            delete doc.data().Admin;
            delete doc.data().root;
            delete doc.data().dev;
            delete doc.data().ficoo;
            // delete doc.data().disableAt;
            // delete doc.data().disableView;
            delete doc.data().inscrito;
            users.push(doc.data());
          }
        });
        return null;
      })
      .catch(err => {
        console.error('erro no banco:', err);
      });
    setLoad(false);
    getCheckin();
    return;
  };

  const getCheckin = async () => {
    await firestore()
      .collection('checkin')
      .doc('evento')
      .collection('users')
      // .limit(10)
      .get()
      .then(result => {
        result.forEach(doc => {
          users.map((value, index) => {
            if (doc.data().uid == users[index].uid) {
              users[index].checkin = true;
            }
          });
        });
        return null;
      })
      .catch(err => {
        console.error('erro no banco:', err);
      });
    setLoad(false);
    getPresenca();
    return;
  };

  const getPresenca = () => {
    chave13.map(value => {
      getPresenca13(value);
    });
    chave14.map(value => {
      getPresenca14(value);
    });
    getMpe();
  };

  const getPresenca13 = async chave => {
    await firestore()
      .collection('checkin')
      .doc(chave)
      .collection('presence')
      .get()
      .then(result => {
        result.forEach(doc => {
          users.map((value, index) => {
            if (doc.data().uid == users[index].uid) {
              users[index].presenca13 = true;
            }
          });
        });
        return;
      })
      .catch(err => {
        console.log(err);
      });
    return;
  };

  const getPresenca14 = async chave => {
    await firestore()
      .collection('checkin')
      .doc(chave)
      .collection('presence')
      .get()
      .then(result => {
        result.forEach(doc => {
          users.map((value, index) => {
            if (doc.data().uid == users[index].uid) {
              users[index].presenca14 = true;
            }
          });
        });
        return;
      })
      .catch(err => {
        console.log(err);
      });
    return;
  };

  const getMpe = async () => {
    await firestore()
      .collection('mpe')
      .get()
      .then(result => {
        console.log(result.lenth);
        result.forEach(doc => {
          users.map((value, index) => {
            if (doc.data().uid == users[index].uid) {
              users[index].mpe = doc.data().post;
            }
          });
        });
        return;
      })
      .catch(err => {
        console.log(err);
      });

    setTimeout(() => {
      exportXls(dados);
    }, 10000);
    return;
  };

  return (
    <View style={styles.container}>
      {load && <Loading />}
      {!load && (
        <View style={{ gap: 20 }}>
          {users && (
            <Text
              style={{
                fontFamily: 'fontRegular',
                letterSpacing: 1,
                fontSize: 16,
              }}>
              Dados Carregados
            </Text>
          )}
          <TouchableOpacity
            onPress={() => {
              exportXls(dados);
            }}
            activeOpacity={0.8}
            style={{
              padding: 10,
              paddingHorizontal: 30,
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 10,
              backgroundColor: 'white',
              elevation: 10,
            }}>
            <Text
              style={{
                fontFamily: 'fontRegular',
                letterSpacing: 1,
                fontSize: 18,
              }}>
              Exports
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
