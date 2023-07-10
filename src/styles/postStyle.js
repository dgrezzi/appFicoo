import { StyleSheet } from 'react-native';
import { APP_VARS } from '../constants/APP_VARS';

export default postStyles = StyleSheet.create({
  postContainer: {
    backgroundColor: APP_VARS.color.secundary,
    flexDirection: 'column',
    borderRadius: 15,
    marginVertical: 4,
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content: { maxWidth: '100%', gap: 4 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  likeButton: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },

  textInput: {
    height: '90%',
    backgroundColor: APP_VARS.color.white,
    textAlignVertical: 'top',
    fontSize: APP_VARS.size.font * 2,
    padding: 12,
    color: APP_VARS.color.txtDark,
  },
  inputPost: {
    textAlignVertical: 'top',
    width: '100%',
    height: '90%',
    backgroundColor: APP_VARS.color.txtInput,
    padding: 8,
    fontSize: APP_VARS.size.font * 2,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});
