import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    height: hp('20%'),
    justifyContent: 'center',
  },
  textInputContain: {
    flex: 1,
    // backgroundColor: 'green',
    marginTop: 20,
  },
  textInput: {
    // flex: 1,
    // backgroundColor: 'grey',
    borderBottomWidth: 2,
    borderBottomColor: '#efefef',
    marginHorizontal: 50,
    marginVertical: wp('2%'),
    fontSize: 16,
    paddingBottom: 10,
    paddingTop: 40,
  },
  text2: {
    fontSize: hp('15%'),
    textAlign: 'center',
  },
  btnStyle3: {
    flex: 2,
    marginHorizontal: 50,
    marginVertical: 30,
    backgroundColor: 'rgb(245,245,245)',
    borderRadius: 10,
    justifyContent: 'center',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#eee',
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  textBtnStyle3: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
});
