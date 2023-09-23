import firestore from '@react-native-firebase/firestore';
import { Buffer } from 'buffer';

function toBase64(input) {
  return Buffer.from(input, 'utf-8').toString('base64');
}

function fromBase64(encoded) {
  return Buffer.from(encoded, 'base64').toString('utf8');
}

export default async function setDataUserFirebase({
  uid,
  name,
  email,
  pwd,
  photoURL,
}) {
  await firestore()
    .collection('user')
    .doc(uid)
    .set({
      name: name,
      createdAt: new Date(),
      pwd: toBase64(pwd),
      email: email,
      photoURL: photoURL,
      isAdmin: false,
      disableView: false,
    })
    .then(() => {})
    .catch(err => {
      console.error('erro no banco:', err);
    });
}
