import firestore from '@react-native-firebase/firestore';

export default async function getPostFirebase() {
  await firestore()
    .collection('posts')
    .orderBy('createdAt', 'desc')
    .limit(5)
    .get()
    .then(snapshot => {
      return snapshot;
    })
    .catch(err => {
      console.error('erro no banco:', err);
    });
  return null;
}
