import React from 'react';
import { connect } from 'react-redux';
import PageContent from '../../../foundation/PageContent';
import PictureUploader from '../pictureUploader/PictureUploader';
import AddressUploader from '../addressUploader/AddressUploader';
import Grid from '../../../foundation/Grid';
import SpinnerLarge from '../../../spinner/SpinnerLarge';
import Map from '../map/Map';
import Styled from './EditAdForm.styles';
import {
  getAdAddressData,
  getAdpositionData,
  getEditableAdId,
} from '../../../../store/selectors';
import Calendar from '../calendar/Calendar';
import EditAmenities from '../editAmenities/EditAmenities';
import ExpandableContainer from '../../../foundation/expandableContainer';
import EditThingsToKnow from '../editThingsToKnow/EditThingsToKnow';
import EditCancellation from '../editCancellation/EditCancellation';
import EditDescription from '../editDesctiption/EditDescription';
import { IS_SERVER } from '../../../../constants';

const EditAdForm = ({
  ad,
  loading,
  addressData,
  positionData,
  adId,
  dispatch,
}) => {
  return (
    <PageContent>
      {Object.keys(ad).length ? (
        <div>
          <h1>EDITING:</h1>

          {loading ? <SpinnerLarge /> : null}
          {!IS_SERVER ? <PictureUploader ad={ad} /> : null}
          <ExpandableContainer title="Description" isCollapsed={false}>
            <EditDescription />
          </ExpandableContainer>
          <ExpandableContainer title="Location">
            <Grid columns="1fr 1fr">
              <AddressUploader />
              <Map
                adId={adId}
                positionData={positionData}
                addressData={addressData}
                dispatch={dispatch}
              />
            </Grid>
          </ExpandableContainer>
          <ExpandableContainer title="Calendar" renderHidden={true}>
            <Styled.DatePickerWrapper>
              <Calendar adId={adId} />
            </Styled.DatePickerWrapper>
          </ExpandableContainer>
          <ExpandableContainer title="Amenities">
            <EditAmenities />
          </ExpandableContainer>
          <ExpandableContainer title="Important information">
            <EditThingsToKnow />
          </ExpandableContainer>
          <ExpandableContainer title="Cancellation policy">
            <EditCancellation />
          </ExpandableContainer>
        </div>
      ) : null}
    </PageContent>
  );
};

const mapStateToProps = state => ({
  addressData: getAdAddressData(state),
  loading: state.ads.loading,
  positionData: getAdpositionData(state),
  adId: getEditableAdId(state),
});

export default connect(mapStateToProps)(EditAdForm);
