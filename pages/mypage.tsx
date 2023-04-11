import React from 'react';
import { Grid } from 'semantic-ui-react';
import Image from 'next/image';
import Layout from '../component/layout/Layout';

function Mypage(props) {
  return (
    <Layout>
      <Grid>
        <Grid.Row columns={3}>
          <Grid.Column>
            <Image width={500} height={500} src="http://localhost:3065/image.png" />
          </Grid.Column>
          <Grid.Column>
            <Image width={500} height={500} src="http://localhost:3065/image.png" />
          </Grid.Column>
          <Grid.Column>
            <Image width={500} height={500} src="http://localhost:3065/image.png" />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={4}>
          <Grid.Column>
            <Image layout="fill" src="http://localhost:3065/image.png" />
          </Grid.Column>
          <Grid.Column>
            <Image layout="fill" src="http://localhost:3065/image.png" />
          </Grid.Column>
          <Grid.Column>
            <Image layout="fill" src="http://localhost:3065/image.png" />
          </Grid.Column>
          <Grid.Column>
            <Image layout="fill" src="http://localhost:3065/image.png" />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={5}>
          <Grid.Column>
            <Image layout="fill" src="http://localhost:3065/image.png" />
          </Grid.Column>
          <Grid.Column>
            <Image layout="fill" src="http://localhost:3065/image.png" />
          </Grid.Column>
          <Grid.Column>
            <Image layout="fill" src="http://localhost:3065/image.png" />
          </Grid.Column>
          <Grid.Column>
            <Image layout="fill" src="http://localhost:3065/image.png" />
          </Grid.Column>
          <Grid.Column>
            <Image layout="fill" src="http://localhost:3065/image.png" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
}

export default Mypage;
