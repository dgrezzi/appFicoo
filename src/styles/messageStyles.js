import { StyleSheet } from 'react-native';
import { APP_VARS } from '../constants/APP_VARS';

export default messageStyles = StyleSheet.create({
  containerInput: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'flex-end',
  },
  mainContainerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderRadius: 25,
    marginRight: 10,
  },
  buttonContainer: {
    backgroundColor: APP_VARS.color.btnGreen,
    height: APP_VARS.size.icons * 1.5,
    width: APP_VARS.size.icons * 1.5,
    borderRadius: APP_VARS.size.icons * 0.9,
    borderColor: APP_VARS.color.icons,
  },
});
