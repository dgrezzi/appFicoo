import auth from '@react-native-firebase/auth';
import getDataUserFirebase from './getDataUserFirebase';
import setLoad from './setLoad';

export default async function handleSignIn(email, pwd) {
  await auth()
    .signInWithEmailAndPassword(email, pwd)
    .then(async value => {
      getDataUserFirebase(value);
      return null;
    })
    .catch(err => {
      console.log('erro', err);
      alert('usuario ou senha iválidos');
      setLoad(false);
    });
}
