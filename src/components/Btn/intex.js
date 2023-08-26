import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { VARS } from '../../constants/VARS';

export default function Btn(props) {
  return (
    <TouchableOpacity
      activeOpacity={props.disable ? 0.95 : 0.7}
      onPress={() => props.onPress()}
      style={[
        {
          width: 270,
          height: 52,
          elevation: 10,
          shadowColor: VARS.color.blue,
          backgroundColor: props.disable ? 'gray' : props.color,
          borderRadius: 15,
          marginVertical: 8,
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}>
      <Text
        style={{
          fontFamily: 'Abel',
          fontSize: 20,
          letterSpacing: 1,
          color: VARS.color.white,
        }}>
        {props.label}
      </Text>

      <View
        style={{
          position: 'absolute',
          right: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Ionicons
          style={{
            position: 'absolute',
          }}
          name={props.icon}
          size={props.iconSize}
          color={VARS.color.orange}
        />
      </View>
    </TouchableOpacity>
  );
}

/* Utilização do componente

<Btn
  label=""
  color={}
  icon=""
  iconSize={}
  iconColor={}
  onPress={() => {

  }}
/>

*/
