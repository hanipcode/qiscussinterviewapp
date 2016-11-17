import React, { Component } from 'react';
import {
  View,
  StyleSheet,
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
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  onPress() {
    const { username, password } = this.state;
    this.props.onFinishRegister(username, password);
  }

  render() {
    return (
      <View style={styles.container}>
        <InputGroup
          titleText="prefered username"
          text=" "
          update={text => this.setState({ username: text })}
        />
        <InputGroup
          titleText="prefered password"
          text=" "
          update={text => this.setState({ password: text })}
          secureTextEntry
        />
        <Button
          style={styles.button}
          text={'Register'}
          onPress={() => this.onPress()}
        />
      </View>
    );
  }
}

Register.propTypes = {
  onFinishRegister: React.PropTypes.func,
};
