import React from 'react';
import store from '../store';
import { Provider } from 'react-redux';
import { AppProvider } from '../hooks/AppContext';
import { ModalsProvider } from 'hooks/ModalsContext';
import { StorageProvider } from '../hooks/StorageContext';
import { ViewportProvider } from '../hooks/ViewportContext';
import { NotificationsProvider } from 'hooks/NotificationsContext';

import '../../public/scss/styles.scss';
import '../../public/scss/variables.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { Component, pageProps } = this.props;

    return (
      <Provider store={store}>
        <AppProvider>
          <ViewportProvider>
            <ModalsProvider>
              <StorageProvider>
                <NotificationsProvider>
                  <Component {...pageProps}/>
                </NotificationsProvider>
              </StorageProvider>
            </ModalsProvider>
          </ViewportProvider>
        </AppProvider>
      </Provider>
    )
  }
}

export default App;