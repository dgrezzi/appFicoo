import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import getDataUserFirebase from './getDataUserFirebase';

export default async function handleSignIn({ email, pwd }) {
  await auth()
    .signInWithEmailAndPassword(email, pwd)
    .then(async value => {
      getDataUserFirebase(value);
      return true;
    })
    .catch(err => {
      console.log('erro', err);
      Alert.alert('Atenção', 'usuario ou senha iválidos');
      return false;
    });
}
