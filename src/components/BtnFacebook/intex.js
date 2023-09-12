import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { VARS } from '../../constants/VARS';

export default function BtnFacebook(props) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{
        shadowColor: VARS.color.blue,
        elevation: 5,
        marginVertical: 10,
        borderRadius: 15,
        borderColor: VARS.color.whiteDark,
        borderWidth: 1,
        backgroundColor: VARS.color.white,
        width: 270,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          backgroundColor: VARS.color.white,
          borderRadius: 20,
          alignItems: 'center',
          flexDirection: 'row',
          height: 38,
          justifyContent: 'space-around',
          width: '100%',
        }}>
        <Ionicons
          name="logo-facebook"
          size={VARS.size.icons}
          color={VARS.color.blue}
        />
        <Text
          style={{
            fontFamily: 'fontRegular',
            fontSize: 20,
            letterSpacing: 1,
            color: VARS.color.title,
          }}>
          {props.label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
