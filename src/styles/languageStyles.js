import { StyleSheet } from 'react-native';
import { APP_VARS } from '../constants/APP_VARS';

export default languageStyles = StyleSheet.create({
  flag: {
    width: APP_VARS.size.avatar / 2,
    height: APP_VARS.size.avatar / 2,
    borderRadius: APP_VARS.size.avatar,
    margin: 8,
    borderWidth: 0,
    borderColor: APP_VARS.color.secundary,
  },
});
