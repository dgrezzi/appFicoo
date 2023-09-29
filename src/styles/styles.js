import { StyleSheet } from 'react-native';
import { VARS } from '../constants/VARS';

export default styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    backgroundColor: VARS.color.white,
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ios: {
    paddingTop: 48,
  },
  logo: {
    width: VARS.size.logo,
    height: VARS.size.logo,
    borderRadius: VARS.size.logo / 2,
    backgroundColor: 'transparent',
  },
  tview: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: VARS.color.blue,
    height: 290,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
  },
});
