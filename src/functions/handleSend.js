import firestore from '@react-native-firebase/firestore';

export default async function handleSend(user, thread, input) {
  if (input === '') return;
  await firestore()
    .collection('messages')
    .doc(thread._id)
    .collection('MESSAGES')
    .add({
      text: input,
      createdAt: firestore.FieldValue.serverTimestamp(),
      user: {
        _id: user.uid,
        displayName: user.displayName,
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
