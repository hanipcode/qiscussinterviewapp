import {
    StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  cameraCapture: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    width: 60,
    height: 60,
    borderWidth: 10,
    borderColor: '#333344',
    borderRadius: 50,
    backgroundColor: '#444457',
  },
  cameraIcon: {
        // TODO : Icon not show
    alignSelf: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  cameraPreview: {
    flex: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 300,

  },
  inputText: {
  },
  headerTextWrapper: {
    flex: 1,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  formWrapper: {
    marginHorizontal: 4,
    marginVertical: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 20,
  },
  Button: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#bdc3c7',
  },
  buttonText: {
    color: '#ecf0f1',
    fontSize: 15,
    fontWeight: '200',
  },
});

export default styles;
