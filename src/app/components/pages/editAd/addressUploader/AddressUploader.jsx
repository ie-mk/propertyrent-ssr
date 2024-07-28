import React, { useState } from 'react';
import Styled from './AddressUploader.styles';
import { CountryDropdown } from 'react-country-region-selector';
import { connect } from 'react-redux';
import Geocode from 'react-geocode';
import { MAP_API_KEY } from '../../../../../config';
import { adActions } from '../../../../store/actions';
import { Formik, Field } from 'formik';
import { getAdAddressData } from '../../../../store/selectors';
import { useTranslation } from 'react-i18next';

const AddressUploader = ({ dispatch, addressData, adId }) => {
  const [country, setCountry] = useState('');
  const { t } = useTranslation();
  Geocode.setApiKey(MAP_API_KEY);
  Geocode.setLanguage('en');

  const getLocation = async values => {
    const address = values;
    const adAddress =
      address.addressLine1 +
      ',' +
      address.addressLine2 +
      ',' +
      address.city +
      ',' +
      address.country +
      ',' +
      address.zipCode;

    try {
      const response = await Geocode.fromAddress(adAddress);
      return response.results[0].geometry.location;
    } catch (e) {
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={addressData}
      enableReinitialize={true}
      // validationSchema={profileFormValidation}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);

        const location = await getLocation(values);
        values.longtitude = location && location.lng;
        values.latitude = location && location.lat;

        dispatch(adActions.updateAd.request({ adId, data: values }));
        setTimeout(() => setSubmitting(false), 1000);
      }}
    >
      {({ handleSubmit, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <Styled.Title>Address:</Styled.Title>
            <Styled.InputRow>
              <Styled.Container>
                <Styled.Label>Address Line 1</Styled.Label>
                <Styled.InputStyles>
                  <Field className="update-input" name="addressLine1" />
                </Styled.InputStyles>
              </Styled.Container>
            </Styled.InputRow>
            <Styled.InputRow>
              <Styled.Container>
                <Styled.Label>Address Line 2</Styled.Label>
                <Styled.InputStyles>
                  <Field className="update-input" name="addressLine2" />
                </Styled.InputStyles>
              </Styled.Container>
            </Styled.InputRow>
            <Styled.InputRow>
              <Styled.Container>
                <Styled.Label>Address Line 3</Styled.Label>
                <Styled.InputStyles>
                  <Field className="update-input" name="addressLine3" />
                </Styled.InputStyles>
              </Styled.Container>
            </Styled.InputRow>

            <Styled.InputRow>
              <Styled.AddressContainer>
                <Styled.Label>City</Styled.Label>
                <Styled.InputStyles>
                  <Field
                    className="update-input"
                    name="city"
                    component="input"
                    type="text"
                    required
                  />
                </Styled.InputStyles>
              </Styled.AddressContainer>
              <Styled.AddressContainer>
                <Styled.Label>Zip Code</Styled.Label>
                <Styled.InputStyles>
                  <Field
                    className="update-input"
                    name="zipCode"
                    component="input"
                    type="text"
                    required
                  />
                </Styled.InputStyles>
              </Styled.AddressContainer>
              <Styled.AddressContainer>
                <Styled.Label>Country</Styled.Label>
                <Styled.InputStyles>
                  <Field
                    className="hidden"
                    name="country"
                    component="input"
                    type="text"
                  />
                  <CountryDropdown
                    className="countryUpdate-input1"
                    value={country}
                    onChange={val => {
                      setCountry(val);
                      setFieldValue('country', val);
                    }}
                  />
                </Styled.InputStyles>
              </Styled.AddressContainer>
            </Styled.InputRow>
            <Styled.ButtonContainer>
              <Styled.CustomButton submit={true}>
                {t('Update Address')}
              </Styled.CustomButton>
            </Styled.ButtonContainer>
          </div>
        </form>
      )}
    </Formik>
  );
};

const mapStateToProps = state => ({
  addressData: getAdAddressData(state),
  adId: state.ads.editableAdId,
});

export default connect(mapStateToProps)(AddressUploader);
