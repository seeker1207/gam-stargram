import React from 'react';
import { Segment } from 'semantic-ui-react';
import { ToastMsg } from './Toast.styles';

function Toast({ toastColor, toastMsg } : {toastColor: 'green' | 'red'; toastMsg: string}) {
  return (
    <ToastMsg size="huge" internal position="left">
      <Segment inverted color={toastColor}>{toastMsg}</Segment>
    </ToastMsg>
  );
}

export default Toast;
