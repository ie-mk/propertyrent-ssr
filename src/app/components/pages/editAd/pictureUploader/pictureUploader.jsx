import React, { useRef, useState, useEffect } from 'react';
import PicturesViewer from '../../../adContent/picturesViewer/PicturesViewer';
import Styled from './PictureUploader.styles';
import { connect } from 'react-redux';
import { adActions } from '../../../../store/actions';
import { useRouter } from 'next/router';
import usePrevious from '../../../../utils/hooks/usePrevious';

const PictureUploader = ({ dispatch, ad, loading }) => {
  const { query } = useRouter();

  const fileInputRef = useRef(null);
  // const [images, setImages] = useState(ad && ad.images);
  const [fileArray, setFileArray] = useState([]);
  // for pushing to the server we need file objects
  const [fileObj, setFileObj] = useState([]);
  const previousLoadingState = usePrevious(loading);

  useEffect(() => {
    // loading has finished
    if (previousLoadingState && !loading) {
      setFileArray([]);
    }
  }, [loading]);

  const handleChange = event => {
    const files = event.target.files;

    if (!files.length) return;

    const fileUrls = [].slice
      .call(files)
      .map(file => URL.createObjectURL(file));

    setFileArray(fileUrls);
    setFileObj(files);
  };

  const images =
    ad && ad.images ? [...(ad && ad.images), ...fileArray] : [...fileArray];
  // we want to disable admin of images until the selected images are not uploaded
  const adminDisabled = fileArray.length;

  const handleUpload = () => {
    dispatch(
      adActions.updateAdImages.request({
        adId: query && query.id,
        images: fileObj,
      }),
    );
  };

  return (
    <div>
      <PicturesViewer
        images={images}
        defaultPicture={ad && ad.defaultPicture}
        isAdmin={!adminDisabled}
      />
      <input
        className="hidden"
        type="file"
        name="files[]"
        multiple
        onChange={event => handleChange(event)}
        ref={fileInputRef}
      />
      <Styled.ButtonWrapper>
        {!fileArray.length && !loading ? (
          <Styled.CustomButton onClick={() => fileInputRef.current.click()}>
            Select Pictures
          </Styled.CustomButton>
        ) : null}
        {fileArray.length && !loading ? (
          <>
            <Styled.CustomButton type="info" onClick={handleUpload}>
              Upload New Pictures
            </Styled.CustomButton>
            <Styled.CustomButton
              type="warning"
              onClick={() => setFileArray([])}
            >
              Cancel selection
            </Styled.CustomButton>
          </>
        ) : null}
      </Styled.ButtonWrapper>
    </div>
  );
};

const mapStateToProps = state => ({
  loading: state.ads.loading,
});

export default connect(mapStateToProps)(PictureUploader);
