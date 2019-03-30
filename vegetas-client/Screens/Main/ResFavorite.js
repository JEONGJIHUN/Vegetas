import React from 'react';
import { View, ScrollView } from 'react-native';
import axios from 'axios';
import PropTypes from 'prop-types';
import MainRestaurantInfo from './MainRestaurantInfo';
import styles from './ResFavoriteCss';
import API_RES_JOIN_PATH from '../../constants';

export default class ResFavorites extends React.Component {
  static navigationOptions = {
    title: '즐겨찾기',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    favorite: [],
  };

  async componentDidMount() {
    await this.getFavoriteFunc();
  }

  getFavoriteFunc = async () => {
    const { navigation } = this.props;
    const { email } = navigation.state.params;
    const arr = [];
    const datas = await axios.post(API_RES_JOIN_PATH, {
      email,
    });

    for (let i = 0; i < datas.data.length; i += 1) {
      arr.push(datas.data[i].restaurant);
    }
    await this.setState({
      favorite: arr,
    });
  };

  restaurantInfo = (data) => {
    const { navigation } = this.props;
    const { favorite } = this.state;
    const { email } = navigation.state.params;
    navigation.navigate('RestaurantDetails', {
      restDetailData: data,
      getFavorite: favorite,
      email,
      getFavoriteFunc: this.getFavoriteFunc,
    });
  };

  render() {
    const { favorite } = this.state;
    return (
      <View style={styles.contain}>
        <ScrollView>
          <MainRestaurantInfo getTargetArr={favorite} restaurantInfo={this.restaurantInfo} />
        </ScrollView>
      </View>
    );
  }
}
