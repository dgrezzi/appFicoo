import firestore from '@react-native-firebase/firestore';

export default async function handleSend(dataContext, thread, input) {
  if (input === '') return;
  await firestore()
    .collection('messages')
    .doc(thread._id)
    .collection('MESSAGES')
    .add({
      text: input,
      createdAt: firestore.FieldValue.serverTimestamp(),
      user: {
        _id: dataContext.user.uid,
        displayName: dataContext.storageData.name,
      },
    });

  await firestore()
    .collection('messages')
    .doc(thread._id)
    .set(
      {
        lastMessage: {
          text: input,
          createdAt: firestore.FieldValue.serverTimestamp(),
        },
      },
      { merge: true },
    );
}
