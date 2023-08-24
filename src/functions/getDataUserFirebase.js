import firestore from '@react-native-firebase/firestore';
import { MMKV } from 'react-native-mmkv';
import setAuthContext from './setAuthContext';

const storage = new MMKV({ id: 'appFicoo' });

export default async function getDataUserFirebase(data) {
  await firestore()
    .collection('user')
    .doc(data.user.uid)
    .get()
    .then(result => {
      data.storageData = result._data;
      setAuthContext(data);
      return null;
    })
    .catch(err => {
      console.error('erro no banco:', err);
    });
}
