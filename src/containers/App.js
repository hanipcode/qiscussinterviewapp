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
  addAccount
} from '../actions/loginActions';
import Login  from '../components/Login';
import Loading from '../components/Loading';
import Register from '../components/Register';
import AddItem from './AddItem';

const styles = StyleSheet.create({
  container : {
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
      is_posting: false,
    };
  }


  componentWillMount() {
    const { fetchItem } = this.props;
    fetchItem();
  }


  componentWillReceiveProps(props) {
    const { itemData } = props;
    const { dataSource } = this.state;
    if (itemData !== undefined) {
      this.setState({
        dataSource: dataSource.cloneWithRows(itemData.get('data').toArray()),
      });
    }
  }

  cancelPosting() {
    this.setState({ is_posting: false });
  }


  startPosting() {
    this.setState({ is_posting: true });
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
    const { is_posting } = this.state;
    const isRegister = loginData.get('is_register');
    console.log(isRegister);
    const size = itemData.get('data').size;
    if (!isLogin && isRegister) {
      return (<Register onFinishRegister={(uname, password) => addAccount(uname,password)} />)
    } else if (!isLogin) {
      return (<Login
        onLogin={(uname,pass) => login(uname,pass)}
        onRegister={() => startRegister()}
      />
      );
    } else if (isLogin && size === 0) {
      return (<Loading />)
    }
    return (
      <View>
        {is_posting && 
            <AddItem
              cancel={() => this.cancelPosting()}
            />
        }
        {!is_posting &&
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
};

const mapStateToProps = state => ({
  itemData: state.itemReducer,
  loginData: state.loginReducer,
});

export default connect(
  mapStateToProps,
  { fetchItem, login, startRegister, addAccount, logout },
)(App);
