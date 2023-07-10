import { StyleSheet } from 'react-native';
import { APP_VARS } from '../constants/APP_VARS';

export default dashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: APP_VARS.color.primary,
    alignItems: 'center',
    padding: '8%',
  },
  avatar: {
    width: APP_VARS.size.avatar,
    height: APP_VARS.size.avatar,
    borderRadius: APP_VARS.size.avatar / 5,
    margin: 8,
    borderWidth: 4,
    borderColor: APP_VARS.color.secundary,
  },
  icon: {
    marginEnd: 10,
  },
  userData: {
    alignItems: 'flex-start',
    width: '100%',
    marginVertical: 8,
    backgroundColor: APP_VARS.color.secundary,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
});
