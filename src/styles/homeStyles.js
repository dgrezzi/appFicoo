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
  dest1: {
    width: '100%',
    height: '30%',
    padding: 5,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  destcard: {
    width: '95%',
    backgroundColor: 'yellow',
  },
  dest2: {
    width: '100%',
    height: '40%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    gap: 5,
    backgroundColor: 'blue',
    padding: 5,
  },
  parc: {
    width: '100%',
    height: '25%',
    padding: '5%',
    flexDirection: 'row',
    gap: 5,
    backgroundColor: 'green',
  },
  card: {
    width: '30%',
    backgroundColor: 'yellow',
  },
  parcFlag: {
    width: 150,
    aspectRatio: '1.5',
  },
});
