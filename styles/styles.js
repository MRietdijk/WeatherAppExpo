import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  containerSide: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
  },
  arrow: {
    height: 100,
    resizeMode: 'contain',
  },
  textBlock: {
    marginBottom: 30,
    alignItems: 'center'
  },
  link: {
    color: '#66a1ff',
    textDecorationLine: 'underline',
    marginBottom: 20
  },
  h1: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 20,
  },
  h2: {
    fontSize: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginRight: 20,
  },
  main: {
    flex: 1,
    paddingTop: 30,
  },
  icon: {
    width: 100,
    height: 100,
    justifyContent: 'center'
  },
  tempBlock: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  windSpeed: {
    marginTop: 20,
    alignItems: 'center'
  },
  searchBar: {
    width: '90%',
    marginHorizontal: '5%',
    marginTop: 20,
    fontSize: 20,
    paddingLeft: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'black',
  },
  cityBtn: {
    width: '90%',
    marginHorizontal: '5%',
    paddingVertical: 20,
  },
  cityText: {
    fontSize: 20,
    width: '100%',
    textAlign: 'left',
  },
  cityList: {
    width: '100%'
  }
})

export default styles