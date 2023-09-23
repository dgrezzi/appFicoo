import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import handleSignIn from './handleSignIn';
import setDataFirebase from './setDataUserFirebase';

export default async function handleSignUp({ name, email, pwd }) {
  await auth()
    .createUserWithEmailAndPassword(email, pwd)
    .then(async value => {
      await auth()
        .currentUser.updateProfile({
          displayName: name,
        })
        .then(() => {
          const dataFirebase = {
            uid: value.user.uid,
            name: name,
            email: email,
            pwd: pwd,
            photoURL:
              'https://firebasestorage.googleapis.com/v0/b/appficoo-ebbf0.appspot.com/o/avatarM.jpg?alt=media&token=a494693c-611f-435a-b34a-d54fcc38461d',
          };
          setDataFirebase(dataFirebase);
          handleSignIn({ email: email, pwd: pwd });
          return;
        })
        .catch(err => {
          console.error(err);
        });
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Atenção', 'e-mail em uso');
      }
      if (error.code === 'auth/invalid-email') {
        Alert.alert('Atenção', 'e-mail inválido');
      }
    });
}
