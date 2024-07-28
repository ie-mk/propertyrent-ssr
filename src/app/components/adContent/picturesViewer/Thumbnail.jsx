import React, { useState, useRef } from 'react';
import Styled from './Thumbnail.styles';
import ResponsiveImage from '../../foundation/ResponsiveImage';
import { connect } from 'react-redux';
import { adActions } from '../../../store/actions';
import { useRouter } from 'next/router';

const Thumbnail = ({ src, callback, isAdmin, dispatch }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const { query } = useRouter();
  const adId = query && query.id;

  return (
    <Styled.Wrapper
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      <ResponsiveImage
        src={src}
        backGroundSize="cover"
        height="200px"
        cursor="pointer"
        onClick={callback}
      />
      {isAdmin && showOverlay && (
        <Styled.Overlay>
          <Styled.DeleteIconWrapper>
            <i
              className="fa fa-window-close"
              onClick={() => {
                confirm('Are you sure you want to delete this image?') &&
                  dispatch(
                    adActions.deleteAdImage.request({
                      adId,
                      imgUrl: src,
                    }),
                  );
              }}
              aria-hidden="true"
            />
          </Styled.DeleteIconWrapper>
          <Styled.MakeDefaultButton
            type="secondary"
            size="md"
            onClick={() => {
              dispatch(
                adActions.updateAd.request({
                  adId,
                  data: { defaultPicture: src },
                }),
              );
            }}
          >
            Set as default
          </Styled.MakeDefaultButton>
        </Styled.Overlay>
      )}
    </Styled.Wrapper>
  );
};

export default connect()(Thumbnail);
