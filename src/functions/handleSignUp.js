import auth from '@react-native-firebase/auth';
import handleSignIn from './handleSignIn';
import setDataFirebase from './setDataUserFirebase';

export default async function handleSignUp(name, email, pwd) {
  await auth()
    .createUserWithEmailAndPassword(email, pwd)
    .then(async value => {
      await auth()
        .currentUser.updateProfile({
          displayName: name,
        }) // Atualiza cadastro no banco adicionando displayName
        .then(() => {
          const dataFirebase = {
            name: name,
            email: email,
            pwd: pwd,
            photoURL:
              'https://firebasestorage.googleapis.com/v0/b/appficoo-ebbf0.appspot.com/o/avatarM.jpg?alt=media&token=a494693c-611f-435a-b34a-d54fcc38461d',
          };
          setDataFirebase(value.user.uid, dataFirebase); // Grava no banco informações do usuario cadastrado
          handleSignIn(email, pwd);
          return;
        })
        .catch(err => {
          console.error(err);
        });
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        alert('e-mail em uso');
      }
      if (error.code === 'auth/invalid-email') {
        alert('e-mail inválido');
      }
    });
}
