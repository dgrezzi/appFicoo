import auth from '@react-native-firebase/auth';
import getDataUserFirebase from './getDataUserFirebase';

export default async function handleSignIn(email, pwd) {
  await auth()
    .signInWithEmailAndPassword(email, pwd)
    .then(async value => {
      getDataUserFirebase(value);
      return true;
    })
    .catch(err => {
      console.log('erro', err);
      alert('usuario ou senha iválidos');
      return false;
    });
}
