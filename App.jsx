import * as React from 'react';
import AppRouter from './AppRouter';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './android/app/Redux/store';
import { LogBox } from 'react-native';
function App() {
  LogBox.ignoreLogs(['Warning: ...']); 
LogBox.ignoreAllLogs();
  return (
    <>
     <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <AppRouter/>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
