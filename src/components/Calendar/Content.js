import { Image, Text, View } from 'react-native';
import { VARS } from '../../constants/VARS';

import avatar1 from '../../assets/avatar1.png';
import avatar2 from '../../assets/avatar2.png';
import avatar3 from '../../assets/avatar3.png';
import avatar4 from '../../assets/avatar4.png';
import avatar5 from '../../assets/avatar5.png';
import avatar6 from '../../assets/avatar6.png';

const colors = [
  '#FF8D5D',
  '#426F42',
  '#715BFF',
  '#806454',
  '#FF6666',
  '#999900',
  '#A62A2A',
  '#9370DB',
  '#E47833',
  '#215E21',
  '#8FBC8F',
  '#3366FF',
  '#A8A8A8',
];
const avatar = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

export default function Content(props) {
  return (
    <View
      style={{
        backgroundColor:
          colors[Math.round(Math.random() * (colors.length - 1))],
        borderRadius: 12,
        paddingVertical: 10,
        marginLeft: 40,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Image
        style={{
          width: 45,
          height: 45,
          resizeMode: 'cover',
          borderRadius: 32,
          margin: 15,
        }}
        source={avatar[Math.round(Math.random() * (avatar.length - 1))]}
      />

      <View>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              color: VARS.color.white,
              fontFamily: 'fontRegular',
              fontSize: 18,
              opacity: 0.85,
            }}>
            {props.data.start} -{' '}
          </Text>
          <Text
            style={{
              color: VARS.color.white,
              fontFamily: 'fontRegular',
              fontSize: 18,
              opacity: 0.85,
            }}>
            {props.data.finish}
          </Text>
        </View>

        <Text
          style={{
            color: VARS.color.white,
            fontFamily: 'fontRegular',
            fontSize: 20,
          }}>
          {props.data.title}
        </Text>
      </View>
    </View>
  );
}
