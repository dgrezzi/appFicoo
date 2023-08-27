import firestore from '@react-native-firebase/firestore';
import getDataUserFirebase from './getDataUserFirebase';

export default async function setUpdateUserFirebase(dataContext, data) {
  const uid = dataContext.user.uid;
  const update = {};
  data.name ? (update.name = data.name) : null;
  data.phone ? (update.phone = data.phone) : null;
  data.city ? (update.city = data.city) : null;
  data.aboutme ? (update.aboutme = data.aboutme) : null;
  console.log(update);
  // return;
  await firestore()
    .collection('user')
    .doc(uid)
    .update(update)
    .then(value => {
      getDataUserFirebase(dataContext);
    })
    .catch(err => {
      console.error('erro no banco:', err);
    });
}
