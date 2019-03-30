import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Animated,
  Alert,
  AsyncStorage,
  BackHandler,
} from 'react-native';
import { Asset } from 'expo';
import PropTypes from 'prop-types';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './InitialHomeCss';
import API_USER_SIGNIN_PATH from '../../constants';

class InitialHome extends React.Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    email: '',
    password: '',
    fadeAnim: new Animated.Value(0),
    isLogin: 'false',
  };

  async componentDidMount() {
    const { fadeAnim } = this.state;

    Asset.loadAsync([
      require('../../assets/initialHomeImage.jpg'),
      require('../../assets/searchImage.jpg'),
      require('../../assets/default_rest_image.png'),
    ]);

    await Animated.timing(
      fadeAnim, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 500, // Make it take a while
        delay: 200,
      },
    ).start();

    BackHandler.addEventListener('hardwareBackPress', this.handleBack); // 안드로이드 하드웨어 백버튼으로 이전 화면으로 돌아가는 이벤트를 방지.
  }

  handleBack = () => true; // true는 메인 화면으로 돌아가고 , false 는 물리버튼을 무력화

  onPressSendUserIdentification = () => {
    const { email, password, isLogin } = this.state;
    const { navigation } = this.props;

    axios
      .post(API_USER_SIGNIN_PATH, {
        email,
        password,
      })

      .then(async (result) => {
        await AsyncStorage.setItem('gunbaam', result.data);
        await AsyncStorage.setItem('isLogin', isLogin);

        if (result.status === 200) {
          navigation.navigate('VegLevelSelection', {
            email,
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          Alert.alert('failed, wrong password');
        } else if (error.response.status === 'undefined') {
        } else {
          Alert.alert('unregistered user');
        }
      });
  };

  render() {
    const { navigation } = this.props;
    const { email, password, fadeAnim } = this.state;
    return (
      <Animated.View style={(styles.container, { opacity: fadeAnim })}>
        <ImageBackground
          source={require('../../assets/initialHomeImage.jpg')}
          style={styles.backImg}
        >
          <KeyboardAwareScrollView enableOnAndroid>
            <View style={styles.content}>
              <Text style={styles.text}>Vegetas</Text>
            </View>
            <View style={styles.textInputContain}>
              <TextInput
                style={styles.textInput}
                onChangeText={inputEmail => this.setState({ email: inputEmail })}
                value={email}
                placeholder="EMAIL"
                placeholderTextColor="#FFF"
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.passwordInput.focus();
                }}
                blurOnSubmit={false}
              />
              <TextInput
                style={styles.textInput}
                onChangeText={inputPw => this.setState({ password: inputPw })}
                value={password}
                secureTextEntry
                placeholder="PASSWORD"
                placeholderTextColor="#FFF"
                returnKeyType="go"
                ref={(input) => {
                  this.passwordInput = input;
                }}
                onSubmitEditing={() => {
                  this.setState({
                    email: null,
                    password: null,
                    isLogin: 'true',
                  });
                  this.onPressSendUserIdentification();
                }}
              />
            </View>
          </KeyboardAwareScrollView>
          <View style={styles.buttonContain}>
            <TouchableOpacity
              style={[styles.btnStyle, styles.btnStyle3]}
              onPress={() => {
                this.setState({
                  email: null,
                  password: null,
                  isLogin: 'true',
                });
                this.onPressSendUserIdentification();
              }}
            >
              <Text style={styles.textBtnStyle}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnStyle, styles.btnStyle3]}
              onPress={() => {
                navigation.navigate('SignUp');
              }}
            >
              <Text style={styles.textBtnStyle}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomBlankContain} />
        </ImageBackground>
      </Animated.View>
    );
  }
}

export default InitialHome;
