import firestore from '@react-native-firebase/firestore';

// Cadastra informações do usuário no banco de dados
export default async function setDataUserFirebase(uid, data) {
  await firestore()
    .collection('user')
    .doc(uid)
    .set({
      name: data.name,
      createdAt: new Date(),
      pwd: data.pwd,
      email: data.email,
      photoURL: data.photoURL,
      isAdmin: false,
    })
    .then(() => {})
    .catch(err => {
      console.error('erro no banco:', err);
    });
}
