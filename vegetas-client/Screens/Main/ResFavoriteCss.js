import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

module.exports = StyleSheet.create({
  contain: {
    flex: 1,
    width: wp('90%'),
    marginHorizontal: wp('5%'),
    flexDirection: 'column',
  },
});
