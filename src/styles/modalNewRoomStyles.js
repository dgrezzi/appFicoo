import { StyleSheet } from 'react-native';
import { APP_VARS } from '../constants/APP_VARS';

export default modalNewRoomStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_VARS.color.opacity,
  },
  modal: {
    flex: 1,
  },
  modalContent: {
    flex: 1,
    backgroundColor: APP_VARS.color.primary,
    padding: 15,
  },
  title: {
    marginTop: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: APP_VARS.size.font * 2,
  },
  input: {
    borderRadius: 4,
    height: 45,
    backgroundColor: APP_VARS.color.secundary,
    marginVertical: 15,
    fontSize: APP_VARS.size.font * 1.6,
    paddingHorizontal: 5,
    color: APP_VARS.color.txtDark,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  buttonCreate: {
    borderRadius: 4,
    backgroundColor: APP_VARS.color.btnBlue,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: APP_VARS.size.font * 1.8,
    fontWeight: 'bold',
    color: '#FFF',
  },
  backButton: {
    marginTop: 10,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBackButton: {
    fontSize: APP_VARS.size.font * 1.6,
  },
});
