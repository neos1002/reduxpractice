import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';
import LocalAPI from './src/MainApp';
// import MainApp from './src/MainApp';

import { Provider } from 'react-redux';
import {Store} from './src/Redux/store'


const App = () => {
  return (
    
    <Provider store={Store}>
    <LocalAPI></LocalAPI>
        // <Text>Hello World</Text>
        // {/* <MainApp></MainApp> */}
     </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
