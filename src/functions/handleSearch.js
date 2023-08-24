import firestore from '@react-native-firebase/firestore';

export default async function handleSearch(input) {
  if (input === '') return;
  const responseSearch = await firestore()
    .collection('messages')
    .where('name', '>=', input)
    .where('name', '<=', input + '\uf8ff')
    .get()
    .then(querySnapshot => {
      const threads = querySnapshot.docs.map(documentSnapshot => {
        return {
          _id: documentSnapshot.id,
          name: '',
          lastMessage: { text: '' },
          ...documentSnapshot.data(),
        };
      });
      return threads;
    });
}
