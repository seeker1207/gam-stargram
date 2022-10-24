import React from 'react';
import { Rail, Segment } from 'semantic-ui-react';
import styled from 'styled-components';

const ToastMsg = styled(Rail)`
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  
  .segment {
    position: relative;
    opacity: 0;
    bottom: 2em;
    animation: 3.5s linear alternate showToast;
    
    @keyframes showToast {
      5% {
        opacity: 1;
        bottom: 0;
      }
      
      95% {
          opacity: 1;
          bottom: 0;
      }
      
      100% {
        opacity: 0;
        bottom: 2em;
      }
    }
  }
`;

function Toast({ toastColor, toastMsg } : {toastColor: 'green' | 'red'; toastMsg: string}) {
  return (
    <ToastMsg size="huge" internal position="left">
      <Segment inverted color={toastColor}>{toastMsg}</Segment>
    </ToastMsg>
  );
}

export default Toast;
