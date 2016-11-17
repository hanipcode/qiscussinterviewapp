import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ListView,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { fetchItem } from '../actions/itemActions';
import {
  logout,
  login,
  startRegister,
  addAccount,
} from '../actions/loginActions';
import Login from '../components/Login';
import Loading from '../components/Loading';
import Register from '../components/Register';
import AddItem from './AddItem';

const styles = StyleSheet.create({
  container: {
    margin: 7,
  },
  itemContainer: {
    flex: 1,
    marginVertical: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#cfcfef',
  },
  text: {
    marginVertical: 5,
    marginHorizontal: 5,
  },
  header: {
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#cfcfcf',
    justifyContent: 'flex-end',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#afafff',
  },
  addButton: {
    paddingVertical: 2,
    margin: 5,
    paddingHorizontal: 5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#efefff',
    backgroundColor: '#afafaf',
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds,
      isPosting: false,
    };
  }


  componentWillMount() {
    const { fetchItem } = this.props;
    fetchItem();
  }


  componentWillReceiveProps(props) {
    const { itemData } = props;
    const { dataSource } = this.state;
    const isPosting = itemData.get('is_posting');
    const isError = itemData.get('is_error');
    if (itemData !== undefined) {
      this.setState({
        dataSource: dataSource.cloneWithRows(itemData.get('data').toArray()),
      });
    }
    if (isPosting === false && isError === false) {
      this.setState({ isPosting: false });
    }
  }

  cancelPosting() {
    this.setState({ isPosting: false });
  }


  startPosting() {
    this.setState({ isPosting: true });
  }


  renderRow(rowData) {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.text}>{`nama item : ${rowData.get('name')}`}</Text>
        <Text style={styles.text}>{`Harga : ${rowData.get('price')}`}</Text>
        <Text style={styles.text}>{rowData.get('description')}</Text>
      </View>
    );
  }

  render() {
    const { itemData, loginData, login, startRegister, addAccount } = this.props;
    const isLogin = loginData.get('is_login');
    const { isPosting } = this.state;
    const isRegister = loginData.get('is_register');
    const size = itemData.get('data').size;
    if (!isLogin && isRegister) {
      return (<Register onFinishRegister={(uname, password) => addAccount(uname, password)} />);
    } else if (!isLogin) {
      return (<Login
        onLogin={(uname, pass) => login(uname, pass)}
        onRegister={() => startRegister()}
      />
      );
    } else if (isLogin && size === 0) {
      return (<Loading />);
    }
    return (
      <View>
        {isPosting &&
        <AddItem
          cancel={() => this.cancelPosting()}
        />
        }
        {!isPosting &&
        <View>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => this.props.logout()}
            >
              <Text> Logout </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => this.startPosting()}
            >
              <Text> Tambah Item </Text>
            </TouchableOpacity>
          </View>
          <ListView
            style={styles.container}
            dataSource={this.state.dataSource}
            renderRow={rowData => this.renderRow(rowData)}
          />
        </View>
        }
      </View>
    );
  }
}

App.propTypes = {
  fetchItem: React.PropTypes.func,
  itemData: React.PropTypes.instanceOf(Map),
  loginData: React.PropTypes.instanceOf(Map),
  login: React.PropTypes.func,
  startRegister: React.PropTypes.func,
  addAccount: React.PropTypes.func,
  logout: React.PropTypes.func,
};

const mapStateToProps = state => ({
  itemData: state.itemReducer,
  loginData: state.loginReducer,
});

export default connect(
  mapStateToProps,
  { fetchItem, login, startRegister, addAccount, logout },
)(App);
