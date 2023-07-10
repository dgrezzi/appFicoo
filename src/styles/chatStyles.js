import { StyleSheet } from 'react-native';
import { APP_VARS } from '../constants/APP_VARS';

export default chatStyles = StyleSheet.create({
  headerRoom: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: APP_VARS.color.activeIcon,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  row: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: APP_VARS.color.white,
    // marginVertical: 4,
  },
  content: {
    flexShrink: 1,
  },
  header: {
    flexDirection: 'row',
  },
  contentText: {
    color: APP_VARS.color.txtGray,
    fontSize: 16,
    marginTop: 2,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: APP_VARS.color.txtDark,
  },
  messageBox: {
    borderRadius: 8,
    padding: 8,
    paddingHorizontal: 12,
    marginVertical: 4,
  },
  name: {
    fontSize: APP_VARS.size.font * 1.8,
    color: APP_VARS.color.txtName,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  message: {
    fontSize: APP_VARS.size.font * 1.6,
    color: APP_VARS.color.txtGray,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});
