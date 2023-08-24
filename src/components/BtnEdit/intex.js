import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity } from 'react-native';
import { VARS } from '../../constants/VARS';

export default function BtnEdit(props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => props.onPress()}
      style={[
        {
          gap: 8,
          paddingHorizontal: 15,
          padding: 4,
          shadowColor: VARS.color.blue,
          backgroundColor: props?.color ? props?.color : 'white',
          borderRadius: 15,
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row',
          elevation: 5,
        },
      ]}>
      <Ionicons
        name={props.icon}
        size={props.iconSize * 0.75}
        color={props.iconColor}
      />
      <Text
        style={{
          fontFamily: props.fontFamily ? props.fontFamily : 'Abel',
          fontSize: 20,
          letterSpacing: 1,
          color: props.labelColor,
        }}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
}

/* Utilização do componente
<Btn
  label="ENTRAR"
  color={VARS.color.blue}
  icon="key-outline"
  iconColor={VARS.color.white}
  iconSize={VARS.size.icons * 0.8}
  onPress={() => {
    Function()
  }}
/>
*/
