import { ActivityIndicator, View } from 'react-native';
import { VARS } from '../constants/VARS';
export default function Loading() {
  return (
    <View
      style={{
        zIndex: 99,
        position: 'absolute',
        alignSelf: 'center',
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        borderRadius: 20,
        justifyContent: 'center',
        backgroundColor: 'transparent',
      }}>
      <ActivityIndicator
        styl={{}}
        size={VARS.size.load}
        color={VARS.color.blue}
      />
    </View>
  );
}
