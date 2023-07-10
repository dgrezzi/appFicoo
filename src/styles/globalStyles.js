import { StyleSheet } from 'react-native';
import { APP_VARS } from '../constants/APP_VARS';

const small = 1.8;
const medium = 2;
const large = 2.2;
const xlarge = 2.6;

export default globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: APP_VARS.color.primary,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gap: {
    gap: 12,
  },
  justify: {
    justifyContent: 'center',
  },
  align: {
    alignItems: 'center',
  },
  padding: {
    padding: 4,
  },
  space: {
    padding: 8,
    marginVertical: 4,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  //Botoes
  btnBlue: {
    backgroundColor: APP_VARS.color.btnBlue,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  btnGray: {
    backgroundColor: APP_VARS.color.btnGray,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  btnGreen: {
    backgroundColor: APP_VARS.color.btnGreen,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  // btnFlag: {
  //   width: APP_VARS.size.avatar,
  //   height: APP_VARS.size.avatar,
  // },

  //textos
  titleInput: {
    fontSize: APP_VARS.size.font * medium,
    width: '100%',
    height: 45,
    backgroundColor: APP_VARS.color.txtInput,
    padding: 4,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: APP_VARS.color.txtInput,
    padding: 8,
    fontSize: APP_VARS.size.font * medium,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  txtRedBold: {
    color: APP_VARS.color.txtRed,
    fontSize: APP_VARS.size.font * medium,
    fontWeight: 'bold',
  },
  txtRed: {
    color: APP_VARS.color.txtRed,
    fontSize: APP_VARS.size.font * medium,
  },
  txtDark: {
    color: APP_VARS.color.txtDark,
    fontSize: APP_VARS.size.font * medium,
  },
  txtDarkBold: {
    color: APP_VARS.color.txtDark,
    fontSize: APP_VARS.size.font * medium,
    fontWeight: 'bold',
  },
  txtDarkSmall: {
    color: APP_VARS.color.txtDark,
    fontSize: APP_VARS.size.font * small,
  },
  txtDarkBoldSmall: {
    color: APP_VARS.color.txtDark,
    fontSize: APP_VARS.size.font * small,
    fontWeight: 'bold',
  },
  txtDarkLarge: {
    color: APP_VARS.color.txtDark,
    fontSize: APP_VARS.size.font * large,
  },
  txtDarkXLarge: {
    color: APP_VARS.color.txtDark,
    fontSize: APP_VARS.size.font * large * 1.5,
  },
  txtDarkBoldLarge: {
    color: APP_VARS.color.txtDark,
    fontSize: APP_VARS.size.font * large,
    fontWeight: 'bold',
  },

  txtLight: {
    color: APP_VARS.color.txtLight,
    fontSize: APP_VARS.size.font * medium,
  },
  txtLightBold: {
    color: APP_VARS.color.txtLight,
    fontSize: APP_VARS.size.font * medium,
    fontWeight: 'bold',
  },
  txtLightSmall: {
    color: APP_VARS.color.txtLight,
    fontSize: APP_VARS.size.font * small,
  },
  txtLightBoldSmall: {
    color: APP_VARS.color.txtLight,
    fontSize: APP_VARS.size.font * small,
    fontWeight: 'bold',
  },
  txtLightLarge: {
    color: APP_VARS.color.txtLight,
    fontSize: APP_VARS.size.font * large,
  },
  txtLightBoldLarge: {
    color: APP_VARS.color.txtLight,
    fontSize: APP_VARS.size.font * large,
    fontWeight: 'bold',
  },
  txtLightBoldXLarge: {
    color: APP_VARS.color.txtLight,
    fontSize: APP_VARS.size.font * xlarge,
    fontWeight: 'bold',
  },

  txtGray: {
    fontSize: APP_VARS.size.font * 1.8,
    color: APP_VARS.color.txtGray,
  },

  //Componentes
  postAvatar: {
    width: APP_VARS.size.avatar / 3,
    height: APP_VARS.size.avatar / 3,
    borderRadius: APP_VARS.size.avatar / 2,
    borderWidth: 4,
    borderColor: APP_VARS.color.primary,
    marginRight: 12,
  },
  large: {
    fontSize: APP_VARS.size.font * 2.4,
  },
  logoContainer: {
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    backgroundColor: APP_VARS.color.backGnd,
    marginVertical: 12,
  },
  logo: {
    width: APP_VARS.size.logo,
    height: APP_VARS.size.logo,
    borderRadius: APP_VARS.size.logo / 2,
    margin: 10,
  },

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: APP_VARS.color.backGnd,
  },
  flatList: {
    backgroundColor: APP_VARS.color.primary,
    width: '100%',
  },
  flatButton: {
    position: 'absolute',
    bottom: '3%',
    right: '5%',
    backgroundColor: APP_VARS.color.secundary,
    width: APP_VARS.size.icons * 1.8,
    height: APP_VARS.size.icons * 1.8,
    borderRadius: APP_VARS.size.icons * 0.9,
    borderWidth: 2,
    borderColor: APP_VARS.color.terciary,
  },
  iconCenter: {
    width: '100%',
    height: '100%',
    textAlignVertical: 'center',
    textAlign: 'center',
  },

  containerInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 14,
    gap: 8,
  },

  inputSearch: {
    height: 45,
    backgroundColor: APP_VARS.color.txtInput,
    padding: 8,
    fontSize: APP_VARS.size.font * medium,
    paddingHorizontal: 12,
    borderRadius: 8,

    width: '80%',
  },
  buttonSearch: {
    backgroundColor: '#2e54d4',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: '15%',
  },
  margin: {
    marginBottom: 50,
  },
});
