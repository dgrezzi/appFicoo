import firestore from '@react-native-firebase/firestore';
import { Buffer } from 'buffer';

function toBase64(input) {
  return Buffer.from(input, 'utf-8').toString('base64');
}

function fromBase64(encoded) {
  return Buffer.from(encoded, 'base64').toString('utf8');
}
export default async function setDataUserFirebase(uid, data) {
  await firestore()
    .collection('user')
    .doc(uid)
    .set({
      name: data.name,
      createdAt: new Date(),
      pwd: toBase64(data.pwd),
      email: data.email,
      photoURL: data.photoURL,
      isAdmin: false,
      city: data.city,
    })
    .then(() => {})
    .catch(err => {
      console.error('erro no banco:', err);
    });
}
