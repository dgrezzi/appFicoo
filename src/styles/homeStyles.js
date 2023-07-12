import { StyleSheet } from 'react-native';
import { APP_VARS } from '../constants/APP_VARS';

export default homeStyles = StyleSheet.create({
  flag: {
    width: APP_VARS.size.avatar / 2,
    height: APP_VARS.size.avatar / 2,
    borderRadius: APP_VARS.size.avatar,
    margin: 8,
    borderWidth: 0,
    borderColor: APP_VARS.color.secundary,
  },
  destaque1: {
    height: '34%',
  },
  cardDestaque1: {
    width: 300,
    aspectRatio: 1.62,
    marginHorizontal: 5,
    borderRadius: 25,
  },
  destaque2: {
    height: '50%',
    gap: 5,
    padding: 8,
  },

  cardDestaque2: {
    width: 190,
    aspectRatio: 0.6,
    marginHorizontal: 5,
    borderRadius: 25,
  },
  parceiros: {
    height: '16%',
    gap: 25,
  },

  parcFlag: {
    width: 110,
    aspectRatio: '1.1',
    marginHorizontal: 10,
  },
});
