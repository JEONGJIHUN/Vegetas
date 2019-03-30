/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import {
  Text, View, TouchableOpacity, TextInput, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './SignUpCss';
import { API_USER_SIGNUP_PATH } from '../../constants';

class SignUp extends React.Component {
  static navigationOptions = {
    title: 'Sign Up',
    headerStyle: {
      backgroundColor: 'rgb(83,127,38)',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 20,
    },
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    email: '',
    name: '',
    password: '',
    pwConfirm: '',
  };

  onPressSendUserDB = () => {
    const { navigation } = this.props;
    const { name, email, password } = this.state;
    axios
      .post(API_USER_SIGNUP_PATH, {
        name,
        email,
        password,
      })
      .then(() => {
        Alert.alert('Vegetas', 'congraturation :D');
        navigation.navigate('InitialHome');
      })
      .catch(() => {
        Alert.alert('Vegetas', 'failed ㅠㅠ');
      });
  };

  render() {
    const {
      name, email, password, pwConfirm,
    } = this.state;

    const TextInputContent = [
      {
        onChangeText: (inputName) => {
          this.setState({ name: inputName });
        },
        value: name,
        secureTextEntry: false,
        placeholder: 'NAME',
        onSubmitEditing: () => {
          this.passwordInput1.focus();
        },
        ref: '',
        returnKeyType: 'next',
      },
      {
        onChangeText: (inputEmail) => {
          this.setState({ email: inputEmail });
        },
        value: email,
        secureTextEntry: false,
        placeholder: 'EMAIL',
        onSubmitEditing: () => {
          this.passwordInput2.focus();
        },
        ref: (I) => {
          this.passwordInput1 = I;
        },
        returnKeyType: 'next',
      },
      {
        onChangeText: inputPw => this.setState({ password: inputPw }),
        value: password,
        secureTextEntry: true,
        placeholder: 'PASSWORD',
        onSubmitEditing: () => {
          this.passwordInput3.focus();
        },
        ref: (I) => {
          this.passwordInput2 = I;
        },
        returnKeyType: 'next',
      },
      {
        onChangeText: inputPwConfirm => this.setState({ pwConfirm: inputPwConfirm }),
        value: pwConfirm,
        secureTextEntry: true,
        placeholder: 'PASSWORD CONFIRM',
        onSubmitEditing: () => {
          if (name.length > 0 && email.length > 0 && password.length > 0) {
            if (password === pwConfirm) {
              // axios 로 데이터 server 로 보내기
              this.onPressSendUserDB();
            } else {
              Alert.alert('Please, check blank');
            }
          } else {
            Alert.alert('Please, fill blank');
          }
          this.setState({
            name: '',
            email: '',
            password: '',
            pwConfirm: '',
          });
        },
        ref: (I) => {
          this.passwordInput3 = I;
        },
        returnKeyType: 'go',
      },
    ];

    return (
      <View style={styles.container}>
        <View style={{ flex: 2 }}>
          <View style={styles.content}>
            <Text style={styles.text2}>🍀</Text>
          </View>
          <KeyboardAwareScrollView enableOnAndroid>
            <View style={styles.textInputContain}>
              {TextInputContent.map((input, i) => (
                <TextInput
                  style={styles.textInput}
                  onChangeText={input.onChangeText}
                  value={input.value}
                  secureTextEntry={input.secureTextEntry}
                  placeholder={input.placeholder}
                  placeholderTextColor="#666"
                  key={i}
                  returnKeyType={input.returnKeyType}
                  onSubmitEditing={input.onSubmitEditing}
                  ref={input.ref}
                  blurOnSubmit={false}
                />
              ))}
            </View>
          </KeyboardAwareScrollView>
        </View>
        <View style={{ flex: 0.5 }}>
          <TouchableOpacity
            style={styles.btnStyle3}
            onPress={() => {
              if (
                name.length > 0
                && email.length > 0
                && password.length > 0
                && email.includes('.')
              ) {
                if (password === pwConfirm) {
                  // axios 로 데이터 server 로 보내기
                  this.onPressSendUserDB();
                } else {
                  Alert.alert('Please, check blank');
                }
              } else {
                Alert.alert('Please, fill blank');
              }
              this.setState({
                name: '',
                email: '',
                password: '',
                pwConfirm: '',
              });
            }}
          >
            <Text style={styles.textBtnStyle3}>확 인</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.1 }} />
      </View>
    );
  }
}

export default SignUp;
