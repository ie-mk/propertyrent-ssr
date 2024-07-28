import React, { useState, useRef } from 'react';
import PicturesViewer from '../../adContent/picturesViewer/PicturesViewer';
import Styled from './PictureUploader.styles';
import { connect } from 'react-redux';
import { reduxForm, Field, change } from 'redux-form';

const PictureUploader = ({ formValues, dispatch }) => {
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);
  const fileObj = [];
  const fileArray = [];

  const handleChange = event => {
    if (typeof event.target.files[0] === 'undefined') {
      return;
    }
    fileObj.push(event.target.files);
    for (let i = 0; i < fileObj[0].length; i++) {
      fileArray.push(URL.createObjectURL(fileObj[0][i]));
    }
    setImages(fileArray);
    // dispatch(change('newAdForm', 'defaultPicture', ''));
  };

  return (
    <div>
      <h1>Add form content here</h1>
      <PicturesViewer images={images} formValues={formValues} isAdmin={true} />
      <input
        className="hidden"
        type="file"
        name="files[]"
        multiple
        onChange={event => handleChange(event)}
        ref={fileInputRef}
      />
      <Styled.ContentWrapper>
        <Styled.CustomButton onClick={() => fileInputRef.current.click()}>
          Upload Pictures
        </Styled.CustomButton>
      </Styled.ContentWrapper>
    </div>
  );
};
export default connect()(PictureUploader);
