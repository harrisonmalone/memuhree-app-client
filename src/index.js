import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import App from './components/App';
import Container from './layouts/Container'
import { BrowserRouter } from 'react-router-dom'
import "./styles/main.scss"

ReactDOM.render(
  <BrowserRouter>
    <Container>
      <App />
    </Container>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();