import firestore from '@react-native-firebase/firestore';
import { Text, TouchableOpacity, View } from 'react-native';
import { VARS } from '../../constants/VARS';
import { list } from './programacao';

export default function SetProgramacao() {
  const setProg = async () => {
    Object.keys(list).map(async (value, index) => {
      await firestore()
        .collection('configs')
        .doc('programacao')
        .collection(value)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(async documentSnapshot => {
            firestore()
              .collection('configs')
              .doc('programacao')
              .collection(value)
              .doc(documentSnapshot.id)
              .delete()
              .then(() => {});
          });
        });

      list[value].map(async (i, v) => {
        await firestore()
          .collection('configs')
          .doc('programacao')
          .collection(value)
          .doc()
          .set(i)
          .then()
          .catch();
      });
    });
  };

  return (
    <View style={{ marginVertical: 15 }}>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: 'white',
          elevation: 10,
          borderWidth: 1,
          borderColor: VARS.color.whiteDark,
          borderRadius: 10,
          paddingHorizontal: 20,
        }}
        onPress={() => {
          setProg();
        }}>
        <Text>Gravar</Text>
      </TouchableOpacity>
    </View>
  );
}
