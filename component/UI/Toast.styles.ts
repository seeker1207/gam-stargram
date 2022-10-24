import styled from 'styled-components';
import { Rail } from 'semantic-ui-react';

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
