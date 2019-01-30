import {StyleSheet} from 'react-native';
import { Constants } from 'expo';
export const styles=StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 1,
  },
  listHeader: {
    backgroundColor: 'gray',
    color: 'white',
    fontSize: 20,
    paddingLeft: 10,
  },
  listItem: {
    padding: 10,
    flexDirection: 'row',
    flex: 1,
  },
  listItemText: {
    fontSize: 20,
    paddingLeft: 10,
  },
  input: {
    borderWidth: 1,
    width: '100%',
    height: 30,
    backgroundColor: 'white',
  },
});
