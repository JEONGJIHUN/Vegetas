import React from 'react';
import {
  View, ScrollView, Image, Linking, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import styles from './RestaurantDetailsCss';
import * as constants from '../../constants';

export default class RestaurantDetails extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: `${params.restDetailData.name}`,
      headerStyle: {
        backgroundColor: 'rgb(83,127,38)',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
      },
    };
  };

  state = {
    iconName: 'heart-o',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    const { navigation } = this.props;
    const { restDetailData, getFavorite } = navigation.state.params;
    for (let i = 0; i < getFavorite.length; i += 1) {
      if (restDetailData.name === getFavorite[i].name) {
        this.setState({
          iconName: 'heart',
        });
      }
    }
  }

  componentWillUnmount() {
    const { navigation } = this.props;
    const { getFavoriteFunc } = navigation.state.params;
    getFavoriteFunc();
  }

  onPressCallIcon = (phoneNumber) => {
    const url = `tel:+${phoneNumber}`;
    Linking.canOpenURL(url).then(async (supported) => {
      if (supported) {
        try {
          await Linking.openURL(url);
          return true;
        } catch (e) {
          return e;
        }
      }
      return true;
    });
  };

  onPressFavorite = async (resData) => {
    const { navigation } = this.props;
    const { name } = resData;
    const { email } = navigation.state.params;
    let flag;

    try {
      await axios.post(constants.API_RES_CREATE_JOIN_PATH, {
        resName: name,
        email,
      });
      await this.setState({
        iconName: 'heart',
      });
    } catch (err) {
      flag = true;
      await this.setState({
        iconName: 'heart-o',
      });
    }
    if (flag) {
      flag = false;
      await axios.post(constants.API_RES_DELETE_PATH, {
        resName: name,
        email,
      });
    }
  };

  render() {
    const { navigation } = this.props;
    const { iconName } = this.state;
    const { restDetailData } = navigation.state.params;
    const defaultRestImage = require('../../assets/default_rest_image.png');
    const {
      name, latitude, longitude, phoneNumber, address,
    } = restDetailData;

    const iconData = [
      {
        name: 'phone',
        onPress: () => this.onPressCallIcon(phoneNumber),
      },
      {
        name: `${iconName}`,
        onPress: () => this.onPressFavorite(restDetailData),
      },
      {
        name: 'map-marker',
        onPress: () => navigation.replace('MapScreen', {
          address,
          name,
          latitude,
          longitude,
        }),
      },
    ];
    let restImageURL;
    if (restDetailData.imageURL === '') {
      restImageURL = [defaultRestImage, defaultRestImage];
    } else if (restDetailData.imageURL.includes(',')) {
      restImageURL = restDetailData.imageURL.split(',');
    } else {
      restImageURL = [restDetailData.imageURL];
    }
    return (
      <View style={styles.parent}>
        <View style={styles.container}>
          <ScrollView horizontal>
            {restImageURL.map((detailImage, i) => {
              if (detailImage !== defaultRestImage) {
                return (
                  <Image
                    style={styles.image}
                    source={{
                      uri: detailImage,
                      width: wp('40%'),
                      height: wp('40%'),
                    }}
                    key={i}
                  />
                );
              }
              return (
                <Image
                  style={{
                    width: wp('40%'),
                    height: wp('40%'),
                    marginTop: hp('4%'),
                    marginHorizontal: wp('5%'),
                  }}
                  source={detailImage}
                  key={i}
                  resizeMode="cover"
                />
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.iconContainer}>
          {iconData.map((data, i) => (
            <Icon
              style={styles.icons}
              name={data.name}
              size={50}
              color="rgb(83, 127, 38)"
              backgroundColor="#fff"
              onPress={data.onPress}
              key={i}
            />
          ))}
        </View>
        <View style={styles.detailsContain}>
          <Text style={styles.details}>{`업 명  :  ${restDetailData.name}`}</Text>
          <Text style={styles.details}>{`메 뉴  :  ${restDetailData.menu}`}</Text>
          <Text style={styles.details}>{`주 소  :  ${restDetailData.address}`}</Text>
          <Text style={styles.caution}>확인 후 방문 부탁드립니다.</Text>
        </View>
        <View style={styles.blankContain} />
      </View>
    );
  }
}
