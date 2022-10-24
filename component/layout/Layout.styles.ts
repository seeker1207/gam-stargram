import styled from 'styled-components';
import { Grid, GridRow } from 'semantic-ui-react';

export const LayoutWrapper = styled.div`
  margin: 0 auto!important;
  max-width: 2000px;
`;

export const MenuGridWrapper = styled(GridRow)`
  margin-top: 2em;
  .row:first-of-type {
    position: fixed;
    z-index: 10;
    background: white;
    margin: 0 auto;
    max-width: 2000px;
  }
  
`;

export const GridColumnWrapper = styled(Grid.Column)`
  margin: 0 4% !important;
  padding: 0 !important;
  @media all and (max-width: 800px) {
    max-width: 98%;
  }
`;
