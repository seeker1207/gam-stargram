import React, { ReactElement } from 'react';
import { Grid } from 'semantic-ui-react';
import useLoginUser from '../../hooks/useUser';
import { LayoutWrapper, MenuGridWrapper, GridColumnWrapper } from './Layout.styles';
import MenuBar from './menuBar/MenuBar';
import SideBar from './sideBar/SideBar';

export default function Layout({ children } : {children : ReactElement}) {
  const { isLoggedOut } = useLoginUser();
  console.log(isLoggedOut);
  return (
    <LayoutWrapper>
      <MenuGridWrapper>
        <Grid>
          <GridColumnWrapper width={16}>
            <MenuBar isLoggedOut={isLoggedOut} />
          </GridColumnWrapper>
        </Grid>
      </MenuGridWrapper>
      <Grid>
        <GridColumnWrapper width={16}>
          <SideBar>
            {children}
          </SideBar>
        </GridColumnWrapper>
      </Grid>
    </LayoutWrapper>
  );
}
