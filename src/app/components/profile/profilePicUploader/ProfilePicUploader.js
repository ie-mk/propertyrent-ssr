import React, { useState, useRef } from 'react';
import Styled from './ProfilePicUploader.styles';
import Spinner from '../../spinner/spinner';
import ResponsiveImage from '../../foundation/ResponsiveImage';
import { getUserSelector } from '../../../store/selectors';
import { connect } from 'react-redux';
import { userActions } from '../../../store/actions';

const ProfilePicUploader = ({
  user: { profile, loadingPicture: loading },
  dispatch,
}) => {
  const fileInputRef = useRef(null);
  const profileImage = profile && (profile.profileImage || profile.photoURL);
  const [loadingSuccess, setLoadingSuccess] = useState(null);
  const [loadingFail, setLoadingFail] = useState(null);

  const handleChange = event => {
    if (typeof event.target.files[0] === 'undefined') {
      return;
    }
    dispatch(
      userActions.updateUserProfilePicture.request({
        image: event.target.files[0],
        uid: profile.uid,
      }),
    );
  };

  return (
    <>
      <Styled.ImageWrapper>
        <ResponsiveImage
          src={profileImage || 'img/default.png'}
          borderRadius="50%"
          padding="50%"
          backGroundSize="cover"
        />
      </Styled.ImageWrapper>
      <Styled.ContentWrapper>
        <input
          className="image-input"
          type="file"
          onChange={event => handleChange(event)}
          ref={fileInputRef}
        />
        <Styled.CustomButton onClick={() => fileInputRef.current.click()}>
          {loadingSuccess && (
            <Styled.SuccessResponse>
              <i className="fa fa-check-circle" aria-hidden="true" />
            </Styled.SuccessResponse>
          )}
          {loadingFail && (
            <Styled.FailureResponse>
              <i className="fa fa-exclamation-circle" aria-hidden="true" />
            </Styled.FailureResponse>
          )}
          {loading ? <Spinner /> : <label>SELECT PICTURE</label>}
        </Styled.CustomButton>
      </Styled.ContentWrapper>
    </>
  );
};

const mapStateToProps = state => ({
  user: getUserSelector(state),
});

export default connect(mapStateToProps)(ProfilePicUploader);
