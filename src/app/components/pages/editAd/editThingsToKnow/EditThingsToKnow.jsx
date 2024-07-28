import React from 'react';
import { ContainerBase } from '../../../foundation';
import { things_to_knowMap } from '../../../../constants';
import Styled from './EditThingsToKnow.styles';
import { adActions } from '../../../../store/actions';
import SubmitButton from '../../../button/submit/SubmitButton';
import { Formik, Field } from 'formik';
import { getAdThingsToKnowData } from '../../../../store/selectors';
import { connect } from 'react-redux';

const ItemSection = props => (
  <ContainerBase
    paddingTop="xxxS"
    paddingBottom="sm"
    display="flex"
    {...props}
  />
);

const AdThingsToKnow = ({ adId, thingsToKnowData, dispatch }) => {
  let thingskeys = Object.keys(things_to_knowMap);
  return (
    <Formik
      initialValues={thingsToKnowData}
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
          <ContainerBase
            marginTop="xxl"
            paddingBottom="xxl"
            borderBottom="primary"
          >
            <Styled.HeaderText>Things To Know</Styled.HeaderText>
            <div>
              <Styled.SubHeaderText>House rules</Styled.SubHeaderText>
              {thingskeys.map(key => {
                return (
                  <ItemSection key={key}>
                    <Styled.Icon>
                      <i
                        className={things_to_knowMap[key].icon}
                        aria-hidden="true"
                      />
                    </Styled.Icon>
                    {things_to_knowMap[key].name}
                    <Field
                      name={key}
                      component="input"
                      type={things_to_knowMap[key].type || 'input'}
                    />
                  </ItemSection>
                );
              })}
            </div>
            <SubmitButton submit={true}>Update section info</SubmitButton>
          </ContainerBase>
        </form>
      )}
    </Formik>
  );
};

const mapStateToProps = state => ({
  thingsToKnowData: getAdThingsToKnowData(state),
  adId: state.ads.editableAdId,
});

export default connect(mapStateToProps)(AdThingsToKnow);
