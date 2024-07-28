import React, { useState, memo } from 'react';
import Styled from './ProfileForm.styles';
import { connect } from 'react-redux';
import { Formik, ErrorMessage, Field } from 'formik';
import { CountryDropdown } from 'react-country-region-selector';
import { getUserProfileSelector, getUserSelector } from '../../store/selectors';
import profileFormValidation from './profileForm.validation';
import PhoneInput from 'react-phone-number-input';
import { IS_SERVER } from '../../constants';
import styled from 'styled-components';
import { userActions } from '../../store/actions';
import SpinnerLarge from '../spinner/SpinnerLarge';

const StyledError = styled.div`
  color: red;
`;

let ProfileForm = ({ dispatch, userProfile, user: { loading } }) => {
  if (IS_SERVER) return null;

  return (
    <>
      {loading && <SpinnerLarge />}
      <Styled.Title>Edit Profile</Styled.Title>
      <Formik
        initialValues={{ ...userProfile }}
        enableReinitialize={true}
        validationSchema={profileFormValidation}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          dispatch(userActions.updateUserProfile.request(values));
          setTimeout(() => setSubmitting(false), 1000);
        }}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Styled.InputRow>
              <Styled.NameContainer>
                <Styled.Label>First Name</Styled.Label>
                <Styled.InputStyles>
                  <Field name="firstName" type="text" />
                </Styled.InputStyles>
              </Styled.NameContainer>
              <Styled.NameContainer>
                <Styled.Label>Last Name</Styled.Label>
                <Styled.InputStyles>
                  <Field name="lastName" type="text" />
                </Styled.InputStyles>
              </Styled.NameContainer>
            </Styled.InputRow>
            <Styled.InputRow>
              <Styled.Container>
                <Styled.Label>Email Address</Styled.Label>
                <Styled.InputStyles>
                  <Field name="email" type="email" />
                </Styled.InputStyles>
              </Styled.Container>
            </Styled.InputRow>
            <Styled.InputRow>
              <Styled.Container>
                <Styled.Label>Address Line 1</Styled.Label>
                <Styled.InputStyles>
                  <Field name="addressLine1" type="text" />
                </Styled.InputStyles>
              </Styled.Container>
            </Styled.InputRow>
            <Styled.InputRow>
              <Styled.Container>
                <Styled.Label>Address Line 2</Styled.Label>
                <Styled.InputStyles>
                  <Field name="addressLine2" type="text" />
                </Styled.InputStyles>
              </Styled.Container>
            </Styled.InputRow>
            <Styled.InputRow>
              <Styled.Container>
                <Styled.Label>Address Line 3</Styled.Label>
                <Styled.InputStyles>
                  <Field name="addressLine3" type="text" />
                </Styled.InputStyles>
              </Styled.Container>
            </Styled.InputRow>
            <Styled.InputRow>
              <Styled.Container>
                <Styled.Label>Phone</Styled.Label>
                <Styled.PhoneInputStyles>
                  <PhoneInput
                    name="phoneNumber"
                    international
                    defaultCountry="CA"
                    value={values.phoneNumber || ''}
                    onChange={val => setFieldValue('phoneNumber', val)}
                  />
                </Styled.PhoneInputStyles>
                <ErrorMessage component={StyledError} name="phoneNumber" />
              </Styled.Container>
            </Styled.InputRow>
            <Styled.InputRow>
              <Styled.AddressContainer>
                <Styled.Label>City</Styled.Label>
                <Styled.InputStyles>
                  <Field name="city" type="text" />
                </Styled.InputStyles>
              </Styled.AddressContainer>
              <Styled.AddressContainer>
                <Styled.Label>Country</Styled.Label>
                <Styled.InputStyles>
                  <CountryDropdown
                    name="country"
                    className="countryUpdate-input1"
                    value={values.country}
                    onChange={val => setFieldValue('country', val)}
                  />
                </Styled.InputStyles>
              </Styled.AddressContainer>
              <Styled.AddressContainer>
                <Styled.Label>Zip Code</Styled.Label>
                <Styled.InputStyles>
                  <Field name="zipCode" type="text" />
                </Styled.InputStyles>
              </Styled.AddressContainer>
            </Styled.InputRow>
            <Styled.ButtonContainer>
              <Styled.CustomButton submit={true} size="normal">
                UPDATE PROFILE
              </Styled.CustomButton>
            </Styled.ButtonContainer>
          </form>
        )}
      </Formik>
    </>
  );
};

const initialFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  addressLine1: '',
  addressLine2: '',
  addressLine3: '',
  city: '',
  zipCode: '',
  country: '',
};

const mapStateToProps = state => ({
  userProfile: { ...initialFormValues, ...getUserProfileSelector(state) },
  user: getUserSelector(state),
});

export default connect(mapStateToProps)(ProfileForm);
