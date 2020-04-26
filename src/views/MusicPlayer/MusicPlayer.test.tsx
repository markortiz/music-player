import React from 'react';
import { render, cleanup } from '@testing-library/react'
import { Provider } from 'react-redux'
import { Route } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from '../../store/configureStore';
import MusicPlayer from './MusicPlayer';

const App = () => {
  const store = configureStore();

  return render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
          <Route path="/" render={() => <MusicPlayer/> } />
      </ConnectedRouter>
    </Provider>
  )
}

afterEach(cleanup);

it('can render default state', () => {
  const {getByTestId} = App();
  const title = getByTestId('song-title');
  expect(title).toHaveTextContent('Sunset Lover');
});
