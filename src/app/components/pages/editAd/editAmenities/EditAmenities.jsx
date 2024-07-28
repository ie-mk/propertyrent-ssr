import React from 'react';
import { ContainerBase, Grid } from '../../../foundation';
import { paddingMap } from '../../../../constants/styles';
import { amenitiesMap } from '../../../../constants';
import { Field } from 'formik';
import Styled from '../../../newAdForm/newAdAmenities/newAdAmenities.styles';
import { adActions } from '../../../../store/actions';
import { Formik } from 'formik';
import { getAdAmenitiesData } from '../../../../store/selectors';
import { connect } from 'react-redux';
import SubmitButton from '../../../button/submit/SubmitButton';

const ItemSection = props => (
  <ContainerBase
    paddingTop="xxxS"
    paddingBottom="sm"
    display="flex"
    {...props}
  />
);

const NewAdAmenities = ({ dispatch, amenitiesData, adId }) => {
  const amenitieskeys = Object.keys(amenitiesMap);

  return (
    <Formik
      initialValues={amenitiesData}
      enableReinitialize={true}
      // validationSchema={profileFormValidation}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        dispatch(
          adActions.updateAd.request({
            adId,
            data: {
              amenities: values,
            },
          }),
        );
        setTimeout(() => setSubmitting(false), 1000);
      }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Styled.HeaderText>Amenities</Styled.HeaderText>
          <Grid
            columns="1fr 1fr"
            gridGap={paddingMap.sm}
            mediaColConfig={{ belowTablet: '1fr' }}
          >
            {amenitieskeys.map(key => {
              return (
                <ItemSection key={key}>
                  <Field name={key} component="input" type="checkbox" />
                  <Styled.Icon>
                    <i className={amenitiesMap[key].icon} aria-hidden="true" />
                  </Styled.Icon>
                  {amenitiesMap[key].name}
                </ItemSection>
              );
            })}
          </Grid>
          <SubmitButton submit={true}>Update Amenities</SubmitButton>
        </form>
      )}
    </Formik>
  );
};

const mapStateToProps = state => ({
  amenitiesData: getAdAmenitiesData(state),
  adId: state.ads.editableAdId,
});

export default connect(mapStateToProps)(NewAdAmenities);
