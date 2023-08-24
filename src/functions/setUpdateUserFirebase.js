import firestore from '@react-native-firebase/firestore';
import getDataUserFirebase from './getDataUserFirebase';

export default async function setUpdateUserFirebase(dataContext, data) {
  const uid = dataContext.user.uid;
  await firestore()
    .collection('user')
    .doc(uid)
    .update({
      name: data.name,
      phone: data.phone,
      city: data.city,
      aboutme: data.aboutme,
    })
    .then(value => {
      getDataUserFirebase(dataContext);
    })
    .catch(err => {
      console.error('erro no banco:', err);
    });
}
