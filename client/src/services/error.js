import React from 'react';
import ReactDOM from 'react-dom';
import Error from '../components/Error';

export const log = error => {
  const ELEM_ID = 'snackbar-container';

  let elem = document.getElementById(ELEM_ID);
  if (!elem) {
    elem = document.createElement('div');
    elem.setAttribute('id', ELEM_ID);
    document.body.appendChild(elem);
  }

  ReactDOM.unmountComponentAtNode(elem);

  const message = error.response && error.response.data && error.response.data.error || error.message;
  ReactDOM.render(React.createElement(Error, {message}), elem);
};
