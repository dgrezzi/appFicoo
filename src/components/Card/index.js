import { Image, View } from 'react-native';
import { VARS } from '../../constants/VARS';

export default function Card(props) {
  return (
    <View
      style={{
        backgroundColor: VARS.color.white,
        borderRadius: 18,
        alignItems: 'center',
        aspectRatio: 1,
        width: 250,
        borderWidth: 1,
        borderColor: VARS.color.whiteDark,
        elevation: 10,
        padding: 10,
        marginBottom: 15,
        margin: 5,
      }}>
      <Image
        style={{
          width: '100%',
          height: '100%',
          borderWidth: 1,
          borderRadius: 10,
          resizeMode: 'contain',
        }}
        source={props.image}
      />
    </View>
  );
}
