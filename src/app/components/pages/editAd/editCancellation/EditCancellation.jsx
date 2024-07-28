import React from 'react';
import { ContainerBase, Grid } from '../../../foundation';
import { Field, Formik } from 'formik';
import { adActions } from '../../../../store/actions';
import Styled from './EditCancellation.styles';
import { paddingMap } from '../../../../constants/styles';
import SubmitButton from '../../../button/submit/SubmitButton';
import { connect } from 'react-redux';
import { getCancellationData } from '../../../../store/selectors';

const EditCancellation = ({ adId, cancellationData, dispatch }) => {
  return (
    <Formik
      initialValues={cancellationData}
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
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <ContainerBase
            marginTop="xxl"
            paddingBottom="xxl"
            borderBottom="primary"
          >
            <Grid
              columns="1fr 1fr"
              gridGap={paddingMap.sm}
              mediaColConfig={{ belowTablet: '1fr' }}
            >
              <Styled.CancelationWrapper>
                <Styled.Label>Charge free cancellation period</Styled.Label>
                <Field
                  name="cancellationChargeFreePeriod"
                  component="textarea"
                  type="textarea"
                />
              </Styled.CancelationWrapper>
              <Styled.CancelationWrapper>
                <Styled.Label>Cancellation charges</Styled.Label>
                <Field
                  name="cancellationCharges"
                  component="textarea"
                  type="textarea"
                />
              </Styled.CancelationWrapper>
            </Grid>
            <SubmitButton submit={true}>Update section info</SubmitButton>
          </ContainerBase>
        </form>
      )}
    </Formik>
  );
};

const mapStateToProps = state => ({
  cancellationData: getCancellationData(state),
  adId: state.ads.editableAdId,
});

export default connect(mapStateToProps)(EditCancellation);
