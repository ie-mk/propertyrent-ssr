import React, { useState } from 'react';
import { ContainerBase } from '../../foundation';
import Styled from './AdPricing.styles';
import { connect } from 'react-redux';
import moment from 'moment';
import { getNumberOfDays } from '../../../utils/utils';
import ReserveModal from '../../modals/ReserveModal';

const AdPricing = ({ item, filterValues }) => {
  const [showReserveModal, setShowReserveModal] = useState(false);

  if (!item) return null;

  let startDate =
    filterValues &&
    filterValues.values &&
    filterValues.values.dateRange &&
    filterValues.values.dateRange.startDate;

  let endDate =
    filterValues &&
    filterValues.values &&
    filterValues.values.dateRange &&
    filterValues.values.dateRange.endDate;

  let formattedstartDate = startDate ? moment(startDate).format('DD MMM') : '';
  let formattedendDate = endDate ? moment(endDate).format('DD MMM') : '';

  let numberOfDays = getNumberOfDays(startDate, endDate);

  let numberOfPeople =
    filterValues && filterValues.values && filterValues.values.numberOfPeople;

  return (
    <ContainerBase>
      <Styled.Price>£{item.price_per_night} </Styled.Price> / night
      <Styled.DetailsRow>
        <Styled.DetailsContainer>
          {formattedstartDate} - {formattedendDate} • {numberOfPeople} guests
        </Styled.DetailsContainer>
        <Styled.DetailsContainer textDecor={true} fontBold={true}>
          Edit
        </Styled.DetailsContainer>
      </Styled.DetailsRow>
      <Styled.Button onClick={() => setShowReserveModal(true)}>
        Reserve
      </Styled.Button>
      <Styled.CenterText>You won't be charged yet</Styled.CenterText>
      <Styled.DetailsRow>
        <Styled.DetailsContainer textDecor={true}>
          £{item.price_per_night} x {numberOfDays} nights
        </Styled.DetailsContainer>
        <Styled.DetailsContainer>
          £{item.price_per_night * numberOfDays}
        </Styled.DetailsContainer>
      </Styled.DetailsRow>
      <Styled.DetailsRow borderBottom={true} paddingBottom="sm">
        <Styled.DetailsContainer textDecor={true}>
          Service fee
        </Styled.DetailsContainer>
        <Styled.DetailsContainer>£{item.service_fee}</Styled.DetailsContainer>
      </Styled.DetailsRow>
      <Styled.DetailsRow paddingBottom="lg">
        <Styled.DetailsContainer fontBold={true}>Total</Styled.DetailsContainer>
        <Styled.DetailsContainer fontBold={true}>
          £{item.price_per_night * numberOfDays + item.service_fee}
        </Styled.DetailsContainer>
      </Styled.DetailsRow>
      {showReserveModal ? (
        <ReserveModal
          item={item}
          numberOfDays={numberOfDays}
          onClose={() => setShowReserveModal(false)}
        />
      ) : null}
    </ContainerBase>
  );
};

const mapStateToProps = state => ({
  filterValues: state.form && state.form.filter,
});

export default connect(mapStateToProps)(AdPricing);
