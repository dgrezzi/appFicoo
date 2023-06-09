import firestore from '@react-native-firebase/firestore';

export default async function handlePost(data) {
  await firestore()
    .collection('posts')
    .doc()
    .set({
      title: data.title,
      post: data.post,
      uid: data.user.uid,
      autor: data.user.displayName,
      avatarURL: data.storageData.photoURL,
      createdAt: new Date(),
      like: 0,
      email: data.user.email,
    })
    .then(() => {})
    .catch(err => {
      console.error('erro no banco:', err);
    });
  return null;
}
