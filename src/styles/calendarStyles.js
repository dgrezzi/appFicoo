import { StyleSheet } from 'react-native';
import { APP_VARS } from '../constants/APP_VARS';

export default calendarStyles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 64,
    justifyContent: 'space-around',
  },
  buttonDate: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itenContainer: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: APP_VARS.color.secundary,
    marginTop: 5,
    backgroundColor: APP_VARS.color.secundary,
  },
  date: {
    width: '15%',
    minHeight: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  program: {
    paddingHorizontal: 10,
    minHeight: 60,
    width: '85%',
  },
  programContainer: {
    gap: 5,
  },
  tagContainer: {
    flexDirection: 'row',
    bottom: 0,
    gap: 8,
    marginTop: 10,
  },
  tag: {
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  tag1: {
    backgroundColor: 'green',
  },
  tag2: {
    backgroundColor: 'blue',
  },
  tag3: {
    backgroundColor: 'yellow',
  },
  tag4: {
    backgroundColor: 'red',
  },
});
