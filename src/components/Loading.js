import { ActivityIndicator, View } from 'react-native';
import { APP_VARS } from '../constants/APP_VARS';
import globalStyles from '../styles/globalStyles';
export default function Loading() {
  return (
    <View style={globalStyles.loadingContainer}>
      <ActivityIndicator
        size={APP_VARS.size.load}
        color={APP_VARS.color.activeIndicator}
      />
    </View>
  );
}
