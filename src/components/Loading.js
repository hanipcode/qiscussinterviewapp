import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const Loading = ({ text }) => (
  <View style={styles.container}>
    <Text>{text}</Text>
  </View>
);

Loading.propTypes = {
  text: React.PropTypes.string.isRequired,
};
Loading.defaultProps = {
  text: 'Loading..',
};

export default Loading;
