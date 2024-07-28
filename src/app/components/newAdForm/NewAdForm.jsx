import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Grid } from '../foundation';
import PageContent from '../foundation/PageContent';
import PictureUploader from './pictureUploader/PictureUploader';
import AddressUploader from './addressUploader/AddressUploader';
import Map from './map/Map';
import SelectedDates from './selectDates/SelectedDates';
import Styled from './NewAdForm.styles';
import NewAdAmenities from './newAdAmenities/newAdAmenities';
import ThingsToKnow from './adThingsToKnow/AdThingsToKnow';

const NewAdForm = ({ handleSubmit, formValues, dispatch }) => {
  const location = formValues && formValues.location;

  return (
    <PageContent>
      <form onSubmit={handleSubmit}>
        <PictureUploader formValues={formValues} />
        <Grid columns="1fr 1fr">
          <div>
            <AddressUploader formValues={formValues} />
          </div>
          <div>
            {location && <Map formValues={formValues} dispatch={dispatch} />}
          </div>
        </Grid>

        <Styled.DatePickerWrapper>
          <SelectedDates formValues={formValues} />
        </Styled.DatePickerWrapper>
        <NewAdAmenities />
        <ThingsToKnow />
      </form>
    </PageContent>
  );
};

const mapStateToProps = state => ({
  formValues: state.form && state.form.newAdForm && state.form.newAdForm.values,
});

const connectedForm = connect(mapStateToProps)(NewAdForm);

export default reduxForm({
  form: 'newAdForm',
  enableReinitialize: true,
})(connectedForm);
