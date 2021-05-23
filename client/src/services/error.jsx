import React from 'react';
import ReactDOM from 'react-dom';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

export const log = error => {
  const ELEM_ID = 'snackbar-container';

  let elem = document.getElementById(ELEM_ID);
  if (!elem) {
    elem = document.createElement('div');
    elem.setAttribute('id', ELEM_ID);
    document.body.appendChild(elem);
  }

  ReactDOM.unmountComponentAtNode(elem);

  const component = (
      <Snackbar open={true}>
          <Alert variant="filled" severity="error" onClose={() => {
              ReactDOM.unmountComponentAtNode(elem);
          }}>
              <AlertTitle>שגיאה</AlertTitle>
              {error.message}
          </Alert>
      </Snackbar>
  );

  ReactDOM.render(component, elem);
};
