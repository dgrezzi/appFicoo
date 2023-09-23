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
          elevation: 10,
          borderWidth: 1,
          borderColor: VARS.color.whiteOpacity,
        },
      ]}>
      {props.icon && (
        <Ionicons
          name={props.icon}
          size={props.iconSize * 0.7}
          color={props.iconColor}
        />
      )}
      <Text
        style={{
          fontFamily: props.fontFamily ? props.fontFamily : 'fontRegular',
          fontSize: 18,
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
