import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';
import LocalAPI from './src/MainApp';
// import MainApp from './src/MainApp';

import { Provider } from 'react-redux';
// import {Store} from './src/Redux/store'
import rootReducer from './src/Redux/reducers'
import { createStore } from 'redux';

const store = createStore(rootReducer);

const App = () => {
  return (
    
    <Provider store={store}>
      <LocalAPI></LocalAPI>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
