import React, { Component } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { post } from '../actions/itemActions';
import {
  InputGroup,
  Button,
} from '../components/index';

const styles = StyleSheet.create({
  container: {
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
  text: {
    fontSize: 20,
  },
});
class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: '',
    };
  }

  onPress() {
    const { post } = this.props;
    const { name, price } = this.state;
    post(name, price);
  }

  render() {
    return(
      <View style={styles.container}>
      <Text style={styles.text}> Tambah Item </Text>
      <InputGroup
        titleText="item name"
        text=' '
        update={text => this.setState({ name: text })}
      />
      <InputGroup
        titleText="item price"
        keyboardType="numeric"
        text=' '
        update={text => this.setState({ price: text })}
      />
      <Button
        style={styles.button}
        text={'Tambah Item'}
        onPress={() => this.onPress()}
      />
      <Button
        style={styles.button}
        text={'Cancel'}
        onPress={() => this.props.cancel()}
      />
    </View>
    );
  }
}

const mapStateToProps = state => ({
  itemData: state.itemData,
})

export default connect(
  mapStateToProps,
  { post },
)(AddItem);
