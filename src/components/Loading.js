import { ActivityIndicator, View } from 'react-native';
import { VARS } from '../constants/VARS';
export default function Loading() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: VARS.color.white,
      }}>
      <ActivityIndicator size={VARS.size.load} color={VARS.color.blue} />
    </View>
  );
}
