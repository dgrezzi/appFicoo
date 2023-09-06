import firestore from '@react-native-firebase/firestore';
import getDataUserFirebase from './getDataUserFirebase';

export default async function handleMpe(data) {
  await firestore()
    .collection('mpe')
    .doc()
    .set({
      post: data.post,
      uid: data.user.uid,
      autor: data.storageData?.name,
      avatarURL: data.storageData?.photoURL,
      createdAt: new Date(),
      like: 0,
      email: data.user.email,
    })
    .then(async () => {
      await firestore()
        .collection('user')
        .doc(data.user.uid)
        .update({ mpe: true })
        .then(value => {
          const uid = {
            user: { uid: data.user.uid },
          };
          getDataUserFirebase(uid);
        })
        .catch(err => {
          console.error('erro no banco:', err);
        });
    })
    .catch(err => {
      console.error('erro no banco:', err);
    });
  return null;
}
