// import {createStore} from 'redux';
// import reducer from './reducers/reducer'

// const store = createStore(reducer);

// export default store;

// import {AsyncStorage} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
// import { devToolsEnhancer } from 'redux-devtools-extension';
import rootReducer from './index';
import reducer from './reducers/reducer'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [
    'getData',
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(
    createLogger(),
    thunk
  ),
  // reducer, 
  // devToolsEnhancer()
);

let persistor = persistStore(store);

export default{
  store,
  persistor,
};
