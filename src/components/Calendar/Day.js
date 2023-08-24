import { Text, View } from 'react-native';
import { VARS } from '../../constants/VARS';

export default function Day(props) {
  const dia = {
    12: 'Sexta-feira',
    13: 'Sabado',
    14: 'Domingo',
  };
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View
        style={{
          width: 64,
          height: 64,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: props.backgroundColor,
          borderRadius: 8,
          marginRight: 10,
        }}>
        <Text
          style={{
            color: VARS.color.title,
            fontFamily: 'Abel',
            fontSize: 16,
          }}>
          Out
        </Text>
        <Text
          style={{
            color: VARS.color.blueSolid,
            fontFamily: 'Abel',
            fontSize: 22,
          }}>
          {props.label}
        </Text>
      </View>
      <Text style={{ fontFamily: 'Abel', fontSize: 20 }}>
        {dia[props.label]}, {props.label} de Outubro de 2023
      </Text>
    </View>
  );
}
