import React, { Component } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import {
  InputGroup,
  Button,
} from './index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  button: {
    marginVertical: 10,
    marginHorizontal: 4,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#34495e',
  },
});
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ' ',
      password: ' ',
    };
  }

  onLoginPress() {
    const { username, password } = this.state;
    console.log(username,password);
    this.props.onLogin(username,password);
  }

  onRegisterPress() {
     this.props.onRegister();
  }

  render() {
    return(
    <View style={styles.container}>
      <InputGroup
        titleText="username"
        text={this.state.username}
        update={text => this.setState({ username: text })}
      />
      <InputGroup
        titleText="password"
        text={this.state.password}
        update={text => this.setState({ password: text })}
        secureTextEntry
      />
      <Button
        style={styles.button}
        text={'Login'}
        onPress={() => this.onLoginPress()}
      />
      <Button
        style={styles.button}
        text={'Register'}
        onPress={() => this.onRegisterPress()}
      />
    </View>
    );
  }
}
