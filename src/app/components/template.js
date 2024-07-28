import React from 'react';
import Styled from './pages/front/Front.styles';

const styles = theme => ({
  root: {
    minWidth: 200,
  },
});

const Component = () => (
  <Grid
    columns="1fr 1fr 1fr 1fr"
    mediaColConfig={{
      belowDesktop: '1fr 1fr',
      belowTabletLarge: '1fr',
    }}
  >
    <ContainerBase padding="sm">
      <Styled.Image
        src="https://via.placeholder.com/400x300?text=some text"
        alt="image"
      />
    </ContainerBase>
    <ContainerBase padding="sm">
      <Styled.Image
        src="https://via.placeholder.com/400x300?text=some text"
        alt="image"
      />
    </ContainerBase>
    <ContainerBase padding="sm">
      <Styled.Image
        src="https://via.placeholder.com/400x300?text=some text"
        alt="image"
      />
    </ContainerBase>
    <ContainerBase padding="sm">
      <Styled.Image
        src="https://via.placeholder.com/400x300?text=some text"
        alt="image"
      />
    </ContainerBase>
  </Grid>
);

export default withStyles(styles)(Component);
