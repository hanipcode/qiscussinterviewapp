import React, { Component } from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#66fe55',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    zIndex: 1000,
  },
  error: {
    backgroundColor: '#fe6655',
  },
  text: {
    textAlign: 'center',
    marginHorizontal: 10,
    textAlignVertical: 'center',
    color: '#fafaff',
  },
  retry: {
    color: '#5566ff',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  close: {
    position: 'absolute',
    right: 12,
    marginTop: 4,
    color: '#fff',
    fontSize: 18,
  },
});
class Notifier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heightAnim: new Animated.Value(0),
    };
    this.animStyle = {
      height: this.state.heightAnim,
    };
  }
  componentDidMount() {
    Animated.timing(
      this.state.heightAnim,
      { toValue: 60 },
    ).start();
  }
  onClose() {
    Animated.timing(
      this.state.heightAnim,
      { toValue: 0 },
    ).start();
  }
  render() {
    return (
      <Animated.View
        style={

          this.props.error ?
          [styles.container, styles.error, this.animStyle] :
          [styles.container, this.animStyle]

        }
      >
        <Text style={styles.text}>{this.props.message}</Text>

        {
          this.props.retry ?
            <Text onPress={() => this.props.retry()} style={styles.retry}>
              retry
            </Text> : <View />
        }

        <Text onPress={() => this.onClose()} style={styles.close}>X</Text>
      </Animated.View>
    );
  }
}

Notifier.propTypes = {
  error: React.PropTypes.bool.isRequired,
  message: React.PropTypes.string.isRequired,
  retry: React.PropTypes.func,
};
Notifier.defaultProps = {
  error: true,
  message: 'dummy error message',
};

export default Notifier;
