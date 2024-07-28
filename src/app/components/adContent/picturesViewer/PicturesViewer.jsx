import React, { useState, useEffect } from 'react';
import { ContainerBase, Grid } from '../../foundation';
import { paddingMap } from '../../../constants/styles';
import ResponsiveImage from '../../foundation/ResponsiveImage';
import { change } from 'redux-form';
import Thumbnail from './Thumbnail';
import { connect } from 'react-redux';

const PicturesViewer = ({ images, isAdmin, defaultPicture }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  let imagesArray = [];
  if (images && images.length) {
    imagesArray = [...images];
  }

  if (defaultPicture && images && images.length) {
    imagesArray = imagesArray.filter(a => a !== defaultPicture);
    imagesArray = [defaultPicture, ...imagesArray];
  }

  return (
    <ContainerBase marginBottom="lg" marginTop="lg">
      <Grid
        columns="1fr 1fr"
        gridGap={paddingMap.sm}
        mediaColConfig={{ belowTablet: '1fr' }}
      >
        {imagesArray.length ? (
          <ResponsiveImage
            src={imagesArray[activeIdx]}
            backGroundSize="cover"
            flex="1"
          />
        ) : null}
        <ContainerBase maxHeight="450px" overflowY="scroll">
          <Grid
            columns="1fr 1fr"
            gridGap={paddingMap.sm}
            mediaColConfig={{ belowTablet: '1fr' }}
          >
            {imagesArray.length
              ? imagesArray.map((src, idx) => (
                  <Thumbnail
                    key={`thumb_${idx}`}
                    isAdmin={isAdmin}
                    src={src}
                    callback={() => {
                      setActiveIdx(idx);
                    }}
                  />
                ))
              : null}
          </Grid>
        </ContainerBase>
      </Grid>
    </ContainerBase>
  );
};

export default connect()(PicturesViewer);
