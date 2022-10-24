import styled from 'styled-components';
import { Rail } from 'semantic-ui-react';

export const LoginButtonWrapper = styled.div`
  display: inline-block;
  .ui.button {
    background-color: #5829bb
  }
`;

export const FormFiledWrapper = styled.div`
  input:focus {
    border-color: #5829BBFF !important;
  }
`;

export const ToastMsg = styled(Rail)`
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
