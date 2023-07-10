import { StyleSheet } from 'react-native';
import { APP_VARS } from '../constants/APP_VARS';

export default componentStyles = StyleSheet.create({
  textInput: {
    backgroundColor: APP_VARS.color.txtInput,
    padding: 8,
    fontSize: APP_VARS.size.font * 2,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: '100%',
    marginVertical: 4,
  },
  btnBlue: {
    width: '100%',
    height: 45,
    backgroundColor: APP_VARS.color.btnBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 4,
  },
  btnGray: {
    width: '100%',
    height: 45,
    backgroundColor: APP_VARS.color.btnGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 4,
  },
  txtDark: {
    fontSize: APP_VARS.size.font * 2.2,
    color: APP_VARS.color.txtDark,
  },
  txtDarkBold: {
    fontSize: APP_VARS.size.font * 2.2,
    color: APP_VARS.color.txtDark,
    fontWeight: 'bold',
  },
  txtLight: {
    fontSize: APP_VARS.size.font * 2,
    color: APP_VARS.color.txtLight,
  },
  txtGray: {
    fontSize: APP_VARS.size.font * 1.8,
    color: APP_VARS.color.txtGray,
  },
  logoContainer: {
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    backgroundColor: APP_VARS.color.backGnd,
  },
  logo: {
    width: APP_VARS.size.avatar,
    height: APP_VARS.size.avatar,
    borderRadius: APP_VARS.size.avatar / 2,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: APP_VARS.color.backGnd,
  },
});
