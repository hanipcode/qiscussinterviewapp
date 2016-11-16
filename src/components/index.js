import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TextInput,
  Picker,
  View,
} from 'react-native';
import styles from './form.styles.js';

export class FormText extends Component {
  render() {
    return (
      <View>
        <TextInput
          onChangeText={this.props.onChangeText}
          text={this.props.text}
          {...this.props}
          style={{
            textVerticalAlign: 'top',
            flex: 1,
            justifyContent: 'flex-start',
            borderWidth: 1,
            borderColor: '#ccc',
            alignItems: 'flex-start',
            height: 50,
          }}
        />
      </View>
    );
  }
}

export class HeaderTextGroup extends Component {

  render() {
    return (
      <View style={styles.headerTextWrapper}>
        <Text style={styles.headerText} >{this.props.titleText}</Text>
        <Text style={styles.headerText}>{this.props.counter}</Text>
      </View>
    );
  }
}

export class InputGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ' ',
    };
  }
  componentDidMount() {
    const { text } = this.props;
    this.setState({
      text,
    });
  }
  onChangeText(text) {
    this.setState({
      text,
    });
    this.props.update(text);
  }
  render() {
    return (
      <View style={styles.formWrapper}>
        <HeaderTextGroup
          style={styles.inputText}
          titleText={this.props.titleText}
          counter={this.state.text.length}
        />
        <FormText
          onChangeText={text => this.onChangeText(text)}
          text={this.state.text}
          {...this.props}
        />
      </View>
    );
  }
}

export class PickerGroup extends Component {
  constructor(props) {
    super(props);
    this.state = { picked: this.props.picked };
  }
  onChangeValue(picked) {
    this.setState({
      picked,
    });
    this.props.update(picked);
  }
  render() {
    return (
      <View style={styles.formWrapper}>
        <HeaderTextGroup
          style={styles.inputText}
          titleText={this.props.titleText}
        />
        <Picker
          selectedValue={this.state.picked}
          onValueChange={picked => this.onChangeValue(picked)}
          enabled={this.props.enabled}
        >
          {this.props.itemList.map(item => <Picker.Item key={item} label={item} value={item} />)}
        </Picker>

      </View>
    );
  }
}
export class Button extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableHighlight
        style={[styles.Button, this.props.style]}
        onPress={this.props.onPress}
        {...this.props}
      >
        <Text style={styles.buttonText}> {this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}
