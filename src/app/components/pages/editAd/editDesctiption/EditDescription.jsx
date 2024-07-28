import React from 'react';
import Styled from './EditDescription.styles';
import { getAdDescriptionData } from '../../../../store/selectors';
import { connect } from 'react-redux';
import { adActions } from '../../../../store/actions';
import { Grid } from '../../../foundation';
import { marginMap, paddingMap } from '../../../../constants/styles';
import { Formik } from 'formik';
import SubmitButton from '../../../button/submit/SubmitButton';
import ErrorBoundary from '../../../ErrorBoundary';
import InputField from '@kiwicom/orbit-components/lib/InputField';
import Select from '@kiwicom/orbit-components/lib/Select';
import Textarea from '@kiwicom/orbit-components/lib/Textarea';
import { useTranslation } from 'react-i18next';

const InputFieldCustom = props => (
  <Styled.InputWrapper width="100px" {...props}>
    <InputField size="small" {...props} />
  </Styled.InputWrapper>
);

const EditAdDescription = ({ dispatch, adId, descriptionData }) => {
  const { t } = useTranslation();

  return (
    <Styled.Wrapper>
      <ErrorBoundary>
        <Formik
          initialValues={descriptionData}
          enableReinitialize={true}
          // validationSchema={profileFormValidation}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            dispatch(
              adActions.updateAd.request({
                adId,
                data: values,
              }),
            );
            setTimeout(() => setSubmitting(false), 1000);
          }}
        >
          {({ handleSubmit, setFieldValue, values }) => (
            <form onSubmit={handleSubmit}>
              <Grid
                columns="1fr 2fr"
                gridGap={marginMap.xxl}
                mediaColConfig={{ belowTablet: '1fr' }}
              >
                <div>
                  <InputFieldCustom
                    width="100%"
                    name="title"
                    label="Title"
                    value={values.title}
                    onChange={e => {
                      setFieldValue('title', e.target.value);
                    }}
                  />
                  <Styled.InputWrapper>
                    <Select
                      size="small"
                      label="Type of the property"
                      onChange={e => setFieldValue('type', e.target.value)}
                      value={values.type}
                      options={[
                        {
                          label: 'Please select',
                        },
                        {
                          label: 'Apartment',
                          value: 'apartment',
                        },
                        {
                          label: 'House',
                          value: 'house',
                        },
                        {
                          label: 'Room',
                          value: 'room',
                        },
                        {
                          label: 'Villa',
                          value: 'villa',
                        },
                        {
                          label: 'Other',
                          value: 'other',
                        },
                      ]}
                    />
                  </Styled.InputWrapper>
                  <InputFieldCustom
                    name="nr_of_rooms"
                    type="number"
                    label="Number of Rooms"
                    value={values.nr_of_rooms}
                    onChange={e => {
                      setFieldValue('nr_of_rooms', Number(e.target.value));
                    }}
                  />
                  <InputFieldCustom
                    name="bedrooms"
                    type="number"
                    value={values.bedrooms}
                    label="Number of Bedrooms"
                    onChange={e => {
                      setFieldValue('bedrooms', Number(e.target.value));
                    }}
                  />
                  <InputFieldCustom
                    name="bathrooms"
                    type="number"
                    label="Number of Bathrooms"
                    value={values.bathrooms}
                    onChange={e => {
                      setFieldValue('bathrooms', Number(e.target.value));
                    }}
                  />
                </div>
                <div>
                  <Styled.FieldGroup>
                    <InputFieldCustom
                      name="price_per_night"
                      label="Price per night"
                      type="string"
                      value={values.price_per_night}
                      onChange={e => {
                        setFieldValue(
                          'price_per_night',
                          Number(e.target.value),
                        );
                      }}
                    />
                    <InputFieldCustom
                      name="currency"
                      label="Currency"
                      type="string"
                      value={values.currency}
                      onChange={e => {
                        setFieldValue('currency', e.target.value);
                      }}
                    />
                  </Styled.FieldGroup>
                  <InputFieldCustom
                    name="max_nr_of_guests"
                    label="Max Number Of Guests"
                    type="number"
                    value={values.max_nr_of_guests}
                    onChange={e => {
                      setFieldValue('max_nr_of_guests', Number(e.target.value));
                    }}
                  />
                  <div>
                    <Textarea
                      className="textArea"
                      rows={2}
                      label="Location description"
                      value={values.description_location}
                      name="description_location"
                      onChange={e => {
                        setFieldValue('description_location', e.target.value);
                      }}
                    />
                    <Textarea
                      rows={7}
                      label="Full description"
                      name="description_full"
                      value={values.description_full}
                      onChange={e => {
                        setFieldValue('description_full', e.target.value);
                      }}
                    />
                  </div>
                </div>
              </Grid>
              <SubmitButton submit={true}>
                {t('Update Description')}
              </SubmitButton>
            </form>
          )}
        </Formik>
      </ErrorBoundary>
    </Styled.Wrapper>
  );
};

const mapStateToProps = state => ({
  descriptionData: getAdDescriptionData(state),
  adId: state.ads.editableAdId,
});

export default connect(mapStateToProps)(EditAdDescription);
